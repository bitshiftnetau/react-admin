import React, { setState } from "react";
import UnitDetailedComp from "./UnitDetailedComp";

export default function UnitDetailedListGenerate(props) {
  return props.unitList.map((unit, index) => (
    <UnitDetailedComp
      key={index}
      index={index}
      elementId={unit.id}
      deleteUnit={props.deleteUnit}
      unitname={unit.name}
      unitnum={unit.number}
      unitcontent={unit.content}
    />
  ));
}
