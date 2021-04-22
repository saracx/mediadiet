import axios from "../axios";
import { BrowserRouter, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

export default function App() {
    useEffect(() => {
        axios
            .get("/api/user")
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
                this.setState({ error: "Something went wrong!" });
            });
    }, []);
    return (
        <div id="app">
            <h2>You are logged in!</h2>
            <BrowserRouter>
                <ul>
                    <li>Navigation Component</li>
                    <li>Explanation Component</li>
                    <li>Creation Component</li>
                    <li>View of all the lists </li>
                </ul>
            </BrowserRouter>
        </div>
    );
}

//    <Route path="/create" component={OtherProfile} />
//                 <Route path="/all" component={FindUsers} />
//                 <Route path="/friends" component={Friends} />
//                 <Route path="/chat" component={Chat} />
//                 <Route path="/library" component={Library} />
