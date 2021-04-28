import "../css/nav.css";
import Logout from "../components/logout";
import { Link } from "react-router-dom";
import SaraWasHere from "./sarawashere"



export default function Navigation({user}) {

    if (!user) {
        return (
        <section className="nav-links">
        <br></br>
            <ul>
            <li><a href="/">😻</a></li>
            <li><Link to="/imprint"> ？</Link></li>
            </ul>
        </section>
    );
    }

    return (
        <section className="nav-links">
        
            <ul>
                <li>
                    <Link className="" to={"/"}>
                        📼
                    </Link>
                </li>
                <li>
                    <Link className="" to={"/create-playlist#"}>
                        ✍️
                    </Link>{" "}
                </li>
                <li>
                    <Link className="" to={"/my-mixtapes"}>
                        💽
                    </Link>{" "}
                </li>
                 <li><Link to="/imprint"> ？</Link></li>
            </ul>
            <Logout></Logout>
        </section>
    );
}
