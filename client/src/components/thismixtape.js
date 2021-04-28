import { useState, useEffect } from "react";
import axios from "../axios";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {addLikes, getLikes} from "../redux/actions"


export default function ThisMixtape() {
    const { id } = useParams();
    const user = useSelector((state) => state && state.user);
    // const likes = useSelector((state) => state && state.likes);
    // const playlist = useSelector((state) => state && state.playlist);
    const windowUrl = window.location.href
    const dispatch = useDispatch();

    // const [count, setCount] = useState();
    const [items, setItems] = useState([]);
    const [meta, setMeta] = useState([]);
    const [likes, setLikes] = useState();
    const [alreadyLiked, setAlreadyLiked] = useState(false);
    const [error, setError] = useState("");

    const shareOntwitter = () => {
    var url = `https://twitter.com/intent/tweet?url=${windowUrl}&via=mediadiet&text=Check out this mixtape`;
    window.open(url);
    return false;
 }

    const handleClick = async () => {

        if (user) {
            let user_id = user.id;
            // dispatch(addLikes(id, user_id))
            try {
                const { data } = await axios.post(`/api/likes/add/${id}/${user_id}`);
                console.log(data)
                if (alreadyLiked) {
                    // delete Item from db
                    console.log("waiting for deletion")
                    const { data } = await axios.post(`/api/likes/delete/${id}/${user_id}`);
                    // subtract like
                    if (data.success) {
                        setLikes(likes-1)
                        setAlreadyLiked(false)
                    }
                }
                if (data.success & !alreadyLiked) {
                    setLikes(likes+1)
                }
         
            } catch (err) {
                console.log("error in receiveFinalMixtapes action", err);
             }

            }
        // dispatch action & add to database
        // log the like in database per user
        
    }

  
    
    useEffect(() => {
        
        (async () => {
            try {
                
                const { data } = await axios.get("/api/mixtape/" + id);
                const likes = await axios.get(`/api/likes/` + id);
                let count = likes.data.rows.length;
            
                if (data.success) {
                    setItems(data.mixtape);
                    setMeta(data.meta.rows[0]);
                    setLikes(count)
                    console.log("likes", likes)
                    console.log("likes", likes.data.rows)
                } 

                if (user) {
                    let allLikesOnThisMixtape = likes.data.rows;
                    allLikesOnThisMixtape.map((item) => {
                        if (item.user_id === user.id) {
                            console.log("am i ever in this block")
                            return setAlreadyLiked(true)
                        }
                        else setAlreadyLiked(false)
                    })
                }
                
                else {
                    setError("Sorry, something went wrong!");
                }
            } catch (err) {
                console.log("There was an error at single mixtape view", err);
            }
        })();
    }, [likes]);


    if (!items || !meta) {
        return <h2>There is no mixtape with this id! </h2>;
    }

    return (
        <div id="my-playlists">

        {!user && <div className="new-user">Looks like you're new here! <a href="/welcome">Sign up</a> or <a href="/twitter">login with Twitter</a> to create your own mixtape.</div>}
            <h2>
                <span className="highlight">
                    <b>Mixtape</b>:{" "}
                    <span className="playlist-name">{meta.title}</span>
                </span>
            </h2>
            <p className="description">by <a className="user-name" href={"http://www.twitter.com/" + meta.first}>@{meta.first}</a></p>
            <br></br>
            <p className="description">"{meta.description}"</p>
            <p className="description-meta">
                published: &nbsp;
                {meta.created_at}
            </p>
             
             
             <a className="twitter-share" onClick={() => shareOntwitter()}> Tweet </a>
            

            {/* // Likes counter */}
            
            {user ? <span>&nbsp;<span className="heart animate__animated animate__bounce" onClick={() => handleClick(true)}>❤️</span> {likes && <span className="likes">{likes}</span>}</span> : <span>&nbsp;<span className="heart animate__animated animate__bounce" onClick={() => handleClick(false)}>❤️</span> {likes && <span className="likes">{likes}</span>}</span>}

            {error && <p>"Please sign up to vote on this playlist!</p>}
             

            <div className="mixtape-view">
                {items.map((item, i) => {
                    i++;
                    if (item.type == "movie") {
                        Object.assign(item, {icon: "🎬"});
                        
                    }
                    return (
                        <div key={i + item.id} className="item">
                    
                            <img
                                alt={item.title}
                                className="small-image"
                                src={item.image}
                            ></img>

                            <div className="item-info">
                                <a href={item.url} target="_blank">
                                    <h4>
                                        {i}.{item.title}
                                    </h4>
                                </a>
                                <p className="item-meta">{item.year}</p>
                                <p className="item-meta">{item.icon || item.type} </p> 
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
