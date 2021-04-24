import "../css/nav.css";

import { Link } from "react-router-dom";

export default function Navigation() {
    return (
        <section className="nav-links">
            <ul>
                <li>
                    <Link className="" to={"/"}>
                        Welcome
                    </Link>{" "}
                </li>
                <li>
                    <Link className="" to={"/create-playlist#"}>
                        Create Mixtape
                    </Link>{" "}
                </li>
            </ul>
        </section>
    );
}
