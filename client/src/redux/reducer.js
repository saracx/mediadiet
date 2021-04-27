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
        };
    }

    if (action.type == "ADD_ITEM") {
        
        state = {
            ...state,
            items: [...state.items, action.items],
        };
    }

    if (action.type == "DELETE_ITEM") {
        console.log("Arrived at delete item, item was deleted")
        state = {
            ...state,
            items: state.items.filter((item) => item !== action.item),
        };
    }

    return state;
}
