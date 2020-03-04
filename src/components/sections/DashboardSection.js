import React from "react";
import DashboardGraphComp from "../DashboardGraph/DashboardGraphComp";
import UnitList from "../UnitCounterList/UnitList";

export default function DashboardSection(props) {
  return (
    <div style={props.style} className="section-class">
      <DashboardGraphComp section={props.sections} />
      <UnitList unitList={props.units} />
    </div>
  );
}
