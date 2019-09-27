import React, { useState } from "react";
import ReactDOM from "react-dom";
import Searchparam from "./searchparam";
import Details from "./detail";
import { Router, Link } from "@reach/router";
import ThemeContext from "./themecontext";

const App = () => {
  const themeHook = useState('darkblue');

  return (
    <ThemeContext.Provider value={themeHook}>
      <div>
        <header>
          <Link to="/"> Adopt Me!
      </Link>
        </header>
        <Router>
          <Searchparam path="/" />
          <Details path="/details/:id" />
        </Router>;
    </div >
    </ThemeContext.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));