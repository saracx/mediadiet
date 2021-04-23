import { useSelector } from "react-redux";

export default function Landingscreen() {
    const user = useSelector((state) => state && state.user);
    return (
        <div id="welcome-screen">
            <h2 className="welcome-landing">Hello {user && user.first}</h2>
            <p>
                This is the landing screen, it has access to the global store!
                Here we can describe the product and show playlists that have
                been produced already.
            </p>
        </div>
    );
}
