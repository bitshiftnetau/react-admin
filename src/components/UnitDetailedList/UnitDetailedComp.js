import React, { useState } from "react";
import UnitDetailedNum from "./UnitDetailedNum.js";
import UnitDetailedContent from "./UnitDetailedContent";

export default function UnitDetailedComp(props) {
  const [name, setName] = useState({
    set: props.unitname
  });

  var expandItem = () => {
    alert("expanding item");
  };

  return (
    <div>
      <button
        onClick={() => {
          props.deleteUnit(props.index);
        }}
      >
        Delete
      </button>
      <UnitDetailedNum num={props.unitnum} />
      <p>{name.set}</p>
      <UnitDetailedContent content={props.unitcontent} />
    </div>
  );
}
