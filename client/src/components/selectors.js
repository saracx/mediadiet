import { useState, useEffect } from "react";

export default function Selector() {
    const [option, setOption] = useState("");
    const [error, setError] = useState({});

    const handleChange = (e) => {
        console.log(e.target.value);
        setOption(e.target.value);
        // setOption(e.currentTarget.value);
        setError(false);
    };

    return (
        <div className="select-form">
            <div>Item 1*</div>
            <select
                onChange={(e) => handleChange(e)}
                placeholder="Make a selection"
            >
                <option>Books</option>
                <option>Movies</option>
            </select>
            {option && <input placeholder="Search"></input>}
        </div>
    );
}
