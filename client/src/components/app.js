import axios from "../axios";
import { BrowserRouter, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Logout from "./logout";
import { receiveUser } from "../redux/actions";
import Landingscreen from "./landingscreen";
import Navigation from "./navigation";
import Logo from "./logo";
import Playlisteditor from "./playlist_editor";

export default function App() {
    const dispatch = useDispatch();
    // const [error, setError] = useState();
    const user = useSelector((state) => state && state.user);
    const error = useSelector((state) => state && state.error);

    console.log("user in app", user);

    useEffect(() => {
        !user && dispatch(receiveUser());
    }, []);

    return (
        <div id="app">
            <BrowserRouter>
                <nav id="navigation">
                    <Logo></Logo>
                    <Navigation></Navigation>
                </nav>
                <div id="main">
                    <Route exact path="/" render={() => <Landingscreen />} />
                    <Route
                        path="/create-playlist"
                        render={() => <Playlisteditor />}
                    />
                </div>
            </BrowserRouter>
            <Logout></Logout>
        </div>
    );
}

//    <Route path="/create" component={OtherProfile} />
//                 <Route path="/all" component={FindUsers} />
//                 <Route path="/friends" component={Friends} />
//                 <Route path="/chat" component={Chat} />
//                 <Route path="/library" component={Library} />
