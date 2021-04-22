import axios from "../axios";

export async function addUser(first, email, password) {
    try {
        const { data } = await axios.post("/signup");
        console.log(data);
        if (data.error) {
            return {
                type: "ERROR_MESSAGE",
                error: "Something went wrong",
            };
        }
        return {
            type: "ADD_USER",
            thisUser: data.rows[0],
        };
    } catch (err) {
        console.log("error in addUser action", err);
    }
}
