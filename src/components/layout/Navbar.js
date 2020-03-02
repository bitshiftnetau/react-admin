import React, { useState, useEffect } from "react";

export default function Navbar(props) {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="./home">
          {props.user}
        </a>
      </nav>
    </div>
  );
}
