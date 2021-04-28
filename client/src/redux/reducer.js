export default function (state = {}, action) {
    if (action.type == "RECEIVE_USER") {
        // console.log("user in reducer", action.user);
        state = {
            ...state,
            user: action.user,
        };
    }

    if (action.type == "ERROR_MESSAGE") {
        // console.log(action.error);
        state = {
            ...state,
            error: action.error,
        };
    }

    if (action.type == "CREATE_PLAYLIST") {
        // console.log("playlist in create playlist", action.playlist);
        state = {
            ...state,
            playlist: action.playlist,
            items: [],
            mixtapeLiked: 0,
        };
    }

    if (action.type == "ADD_ITEM") {
        
        state = {
            ...state,
            items: [...state.items, action.items],
        };
    }

    if (action.type == "DELETE_ITEM") {
        state = {
            ...state,
            items: state.items.filter((item) => item !== action.item),
        };
    }

    // if (action.type == "GET_LIKES") {
    //     state = {
    //         ...state,
    //         likes: action.likes,
    //     };
    // }


    // if (action.type == "ADD_LIKE") {
    //     state = {
    //         ...state,
    //         likes: state.likes + 1,
    //     };
    // }

    return state;
}
