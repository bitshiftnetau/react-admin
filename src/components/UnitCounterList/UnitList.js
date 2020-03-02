import React from "react";
import UnitComp from "./UnitComponent/UnitComp";

export default function UnitList(props) {
  return props.unitList.map(unit => (
    <React.Fragment key={unit.id}>
      <UnitComp unitname={unit.name} unitnum={unit.number} />
    </React.Fragment>
  ));
}
