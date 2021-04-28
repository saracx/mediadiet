import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../axios";

export default function Login() {
    const [input, setInput] = useState(false);
    const [error, setError] = useState(false);
    // const dispatch = useDispatch();

    const handleChange = (e) => {
        e.preventDefault();
        setInput((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
        setError(false);
    };

    const handleClick = async (e) => {
        e.preventDefault();
        if (!input.email || !input.password) {
            return setError("Please fill out all the fields");
        } else {
            try {
                const { data } = await axios.post("/login", input);
                console.log(data);

                if (data.error) {
                    setError(data.error);
                } else {
                    setError(false);
                    location.replace("/");
                }
            } catch (err) {
                console.log("error in addUser", err);
            }
        }
    };

    return (
        <div id="signup-form">
            <h2>Login:</h2>
            {error && <p className="error">{error}</p>}
            <input
                onChange={(e) => handleChange(e)}
                placeholder="email"
                name="email"
                type="email"
            ></input>
            <input
                onChange={(e) => handleChange(e)}
                placeholder="password"
                type="password"
                name="password"
            ></input>

            <button
                onClick={(e) => handleClick(e)}
                className="signup-button"
                type="submit"
            >
                Login
            </button>

            <div className="registration-links">
                <Link to="/password/reset">Reset Password</Link><br></br>
                <Link to="/">Registration</Link>
            </div>
        </div>
    );
}
