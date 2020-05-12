import React, { useState, useEffect } from "react";

import UnitNumber from "./UnitNumber";
import CounterComp from "./Counter/CounterComp";
import DueDateComp from "./DueDate/DueDateComp";

import Card from "react-bootstrap/Card";

export default function StudyCounter(props) {
  const [unitNum, setUnitNum] = useState({
    num: props.unitnum
  });

  const [unitName, setUnitName] = useState({
    name: props.unitname
  });

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title></Card.Title>
        <UnitNumber number={unitNum.num} />
        <Card.Subtitle className="mb-2 text-muted">
          <p>Name: {unitName.name}</p>
        </Card.Subtitle>
        <CounterComp /> 
        <DueDateComp />
        <Card.Link href="#">
          FIXME: this should link to the detailed list section
        </Card.Link>
      </Card.Body>
    </Card>
  );
}
