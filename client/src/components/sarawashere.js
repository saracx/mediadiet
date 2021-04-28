import React from 'react';
import { useHistory } from "react-router-dom";


const SaraWasHere = () => {
    let history = useHistory();

    function handleClick() {
        history.goBack();
    }

return (
  <div id="imprint">
      
      <img className="sarawashere" src="/sarawashere.png"></img>
      <div className="imprint">Media Diet is a mixed media mixtape generator by <a href="http://www.github.com/saracx">saracx</a>. made with 🥵 at <a href="http://www.spiced-academy.com">spiced academy</a>. <span className="cursor" onClick={handleClick}>↩️</span> </div>
  </div>
)
}
export default SaraWasHere;