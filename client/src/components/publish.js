import axios from "../axios"
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

export default function Publish({id}) {
const [error, setError] = useState();
const items = useSelector((state) => state && state.items);


const handleClick = async (e) => {
    if (!items || items.length < 2) {
        return setError("Sorry, but this is a lame mixtape. You need at least 3 items!")
    }
            try {
                const { data } = await axios.post("api/playlist/publish/" + id);

                if (data.success) {
                    return location.replace("/my-mixtapes");
                } else {
                    setError("Sorry, something went wrong here!");
                }
            } catch (err) {
                console.log("Error in publish playlist");
                setError("Sorry, we couldn't publish this playlist");
            }
    };

return (<><button className="publish-button" onClick={(e) => handleClick(e)}>👉 Publish</button>{error && <p className="error">{error}</p>}</>)


}