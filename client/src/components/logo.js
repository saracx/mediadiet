// const path = require("path");
import { Link } from "react-router-dom";
import "../css/nav.css";

export default function Logo() {
    return (
        <section className="logo-nav">
            <Link className="logo-nav" to={"/"}>
                {/* <img src="/logo.png" alt="mediadiet logo"></img> */}
                📼
            </Link>
        </section>
    );
}
