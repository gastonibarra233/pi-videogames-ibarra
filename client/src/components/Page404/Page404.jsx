import React from "react";
import page404 from "../../images/CodePen-404-Page.gif";
import { Link } from "react-router-dom";

function Page404() {
  return (
    <div className="container">
      <h2>Ups! Something go wrong</h2>
      <h3><Link to='/videogames'>Back to home</Link></h3>
      <img src={page404} alt="looking..." />
    </div>
  );
}

export default Page404;
