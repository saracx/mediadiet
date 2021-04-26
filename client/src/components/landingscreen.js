import { useDispatch, useSelector } from "react-redux";
import AllMixtapes from "./allmixtapes";

export default function Landingscreen() {
    const user = useSelector((state) => state && state.user);
    let title = "Recently published mixtapes";
    console.log(user);

    return (
        <div id="welcome-screen">
            <h2 className="welcome-landing">Welcome {user && user.first}</h2>
            <AllMixtapes title={title}></AllMixtapes>
        </div>
    );
}
