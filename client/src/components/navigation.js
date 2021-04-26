import "../css/nav.css";
import Logout from "../components/logout";
import { Link } from "react-router-dom";

export default function Navigation() {
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
            </ul>
            <Logout></Logout>
        </section>
    );
}
