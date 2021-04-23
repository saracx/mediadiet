export default function (state = {}, action) {
    if (action.type == "RECEIVE_USER") {
        console.log("user in reducer", action.user);
        state = {
            ...state,
            user: action.user,
        };
    }

    if (action.type == "ERROR_MESSAGE") {
        console.log(action.error);
        state = {
            ...state,
            error: action.error,
        };
    }

    return state;
}
