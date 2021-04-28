/* eslint-disable indent */

import axios from "../axios";


export default function DeletePlaylist({id}) {
    
    const handleDeletePlaylist = async () => {
        console.log("this mixtape id", id)

        // delete playlist from db
        try {
            const res = await axios.post("/api/playlist/delete/" + id)
            console.log(res)
            if (res.data.success) {
                location.replace("/create-playlist")
            }
        }

        catch (err) {
            console.log("error deleting this playlist", err)
        }

    };


    return (
        
        <button className="delete-button" onClick={() => handleDeletePlaylist()}>Delete this playlist</button>
    );
}
