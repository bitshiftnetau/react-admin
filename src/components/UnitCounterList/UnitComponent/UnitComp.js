import React, { useState, useEffect } from "react";

import UnitNumber from "./UnitNumber";
import CounterComp from "./Counter/CounterComp";
import DueDateComp from "./DueDate/DueDateComp";

export default function StudyCounter(props) {
  const [unitNum, setUnitNum] = useState({
    num: props.unitnum
  });

  const [unitName, setUnitName] = useState({
    name: props.unitname
  });

  return (
    <div className="studyCounter">
      <UnitNumber number={unitNum.num} />
      <p>Name: {unitName.name}</p>
      <CounterComp /> <DueDateComp />
    </div>
  );
}
