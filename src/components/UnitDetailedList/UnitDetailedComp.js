import React, { useState } from "react";
import UnitDetailedNum from "./UnitDetailedNum.js";
import UnitDetailedContent from "./UnitDetailedContent";

import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";

export default function UnitDetailedComp(props) {
  const [name, setName] = useState({
    set: props.unitname
  });

  var expandItem = () => {
    alert("expanding item");
  };

  return (
    <div>
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey={props.index}>
          {props.unitnum} - {name.set}{" "}
          <Button
            variant="outline-danger"
            onClick={() => {
              props.deleteUnit(props.index);
            }}
          >
            Delete
          </Button>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={props.index}>
          <Card.Body>
            <UnitDetailedContent content={props.unitcontent} />
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </div>
  );
}
