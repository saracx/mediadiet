import { useDispatch, useSelector } from "react-redux";
import AllMixtapes from "./allmixtapes";
import User from "./user";

export default function Landingscreen() {
    const user = useSelector((state) => state && state.user);
    let title = "Check out some recently published mixtapes:";
    

    return (
        <div id="welcome-screen"> {user &&
            <User first={user.first}></User>}
            <p className="intro">Media Diet lets you generate themed, hand-selected, mixtapes of different media (movies, music, books) to share online.</p>
            <AllMixtapes title={title}></AllMixtapes>
        </div>
    );
}
