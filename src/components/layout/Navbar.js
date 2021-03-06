import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";

export default function LocalNavbar(props) {
  const comp_style = {
    backgroundColor: "black",
    color: "gray"
  };
  return (
    <div>
      <Navbar style={comp_style}>
        <Navbar.Brand href="#home">Navbar with text</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a href="#login">{props.user}</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
