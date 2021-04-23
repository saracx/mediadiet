import React from "react";
import axios from "../axios";
// import { withRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import "../css/logout.css";

export default function Logout() {
    const [error, setError] = useState(false);
    const handleClick = async (e) => {
        console.log("Is clicked!");
        try {
            const { data } = await axios.get("/api/logout");
            if (data.success) {
                location.replace("/");
                window.localStorage.clear();
                window.location.href = "/";
            }
        } catch (err) {
            console.log(err, "err in logout");
        }
    };

    return (
        <section id="logout">
            <button className="logout" onClick={() => handleClick()}>
                Logout
            </button>
        </section>
    );
}

// export default withRouter(Logout);
