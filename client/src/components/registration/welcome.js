import axios from "../../axios";
import { HashRouter, Route } from "react-router-dom";
import Intro from "./intro";
import Signup from "./signup";
import Login from "./login";

export default function Welcome() {
    const logo = "logo.png";
    return (
        <div id="registration">
            <HashRouter>
                <img className="logo" alt="logo" src={logo}></img>
                <Intro></Intro>

                <Route exact path="/" component={Signup} />
                <Route path="/signup" component={Signup} />
                <Route path="/login" component={Login} />

                <div id="o-auth">
                    <span className="important-note">o auth here</span>
                </div>
            </HashRouter>
        </div>
    );
}
