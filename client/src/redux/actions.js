import axios from "../axios";

export async function receiveUser() {
    try {
        const { data } = await axios.get("/api/user");
        // console.log("data in actions", data);

        if (data.error) {
            return {
                type: "ERROR_MESSAGE",
                error: data.error,
            };
        }

        return {
            type: "RECEIVE_USER",
            user: data.user,
        };
    } catch (err) {
        console.log("error in addUser action", err);
    }
}

export async function addPlaylist(input) {
    try {
        const { data } = await axios.post("/api/playlist", input);

        if (data.error) {
            return {
                type: "ERROR_MESSAGE",
                error: data.error,
            };
        }
        return {
            type: "CREATE_PLAYLIST",
            playlist: data.playlist,
        };
    } catch (err) {
        console.log("error in Create Playlist action", err);
    }
}

export async function receivePlaylist() {
    try {
        const { data } = await axios.get("/api/playlist");

        if (data.error) {
            return {
                type: "ERROR_MESSAGE",
                error: data.error,
            };
        }
        return {
            type: "CREATE_PLAYLIST",
            playlist: data.playlist,
        };
    } catch (err) {
        console.log("error in Create Playlist action", err);
    }
}

export async function addNewItem(item) {
    return {
        type: "ADD_ITEM",
        items: item,
    };
}

export async function deleteItem(item) {
    console.log(item);
    return {
        type: "DELETE_ITEM",
        item,
    };
}

// export async function receiveItems() {
//     // axios request to get all items from database and store in state
// //     return {
// //         type: "GET_ITEMS",
// //     };
// }
