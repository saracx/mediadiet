import axios from "../../axios";
import { HashRouter, Route } from "react-router-dom";
import Intro from "./intro";
import Signup from "./signup";
import Login from "./login";
import ResetPass from "./reset"

export default function Welcome() {
    const logo = "tape.png";
    return (
        <div id="registration">
            <HashRouter>
                <h1>Media Diet 💽</h1>
                <hr></hr>
                <Route exact path="/" component={Signup} />
                <Route path="/signup" component={Signup} />
                <Route path="/login" component={Login} />
                 <Route path="/password/reset" component={ResetPass} />
            </HashRouter>


            <div className="registration-links">
             <a className="twitter" href="/twitter">Log in with Twitter</a>

            </div>
            

           
        </div>
    );
}
