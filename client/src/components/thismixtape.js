import React, { useState, useEffect } from "react";
import axios from "../axios";
import {useParams } from "react-router-dom";
import {  useSelector } from "react-redux";
import AllMixtapes from "./allmixtapes"


export default function ThisMixtape() {

    // mixtape id is in the params of the url
    const { id } = useParams();

    // Get the user from global state
    const user = useSelector((state) => state && state.user);

    // items and meta are only received once as the playlist loads
    const [items, setItems] = useState([]);
    const [meta, setMeta] = useState([]);

    // likes are received whenever likes are handled
    const [likes, setLikes] = useState();
    const [alreadyLiked, setAlreadyLiked] = useState(false);
    const [error, setError] = useState(false)

    // Tweet the location of the url
    const windowUrl = window.location.href
    const shareOntwitter = () => {
    var url = `https://twitter.com/intent/tweet?url=${windowUrl}&via=mediadiet&text=Check out this mixtape`;
    window.open(url);
    return false;
    }

    // Handles click on the heart button
    const handleClick = async (registered) => {
        // if the user is registered and set in global scope, the click is either counted as like or as deletion of a prior like

        if (user && registered) {
            let user_id = user.id;
            try {
                const { data } = await axios.post(`/api/likes/add/${id}/${user_id}`);
                if (alreadyLiked) {
                    // delete Item from db
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
        else {
            setError("Please sign up to vote")
        }
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
                } 

                if (user) {
                    let allLikesOnThisMixtape = likes.data.rows;
                    allLikesOnThisMixtape.map((item) => {
                        if (item.user_id === user.id) {
                            
                            return setAlreadyLiked(true)
                        }
                        else setAlreadyLiked(false)
                    })
                }
                
            } catch (err) {
                console.log("There was an error at single mixtape view", err);
                setError("Something went wrong")
            }
        })();
        // will update anytime "likes" is changed
    }, [likes]);


    if (!items || !meta) {
        return <React.Fragment>
        <span className="error">There is no mixtape with this id! Here are all recently published mixtapes:</span>
        <AllMixtapes></AllMixtapes>
        </React.Fragment>;
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

            {error && <span className="error">{error}</span>}
             

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
                                {item.description && <p className="item-meta">{item.description} </p>}
                                <p className="item-meta">{item.year} </p>
                                {item.author && <p className="item-meta">{item.author} </p>}
                                <p className="item-meta">{item.icon || item.type} </p> 
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
