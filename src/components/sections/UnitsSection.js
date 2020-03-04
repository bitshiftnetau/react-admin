import React from "react";
import UnitDetailedListComp from "../UnitDetailedList/UnitDetailedListComp";
import AddUnitComp from "../Modals/AddUnit/AddUnitComp";

export default function UnitsSection(props) {
  return (
    <div style={props.style} className="section-class">
      <AddUnitComp addUnit={props.addUnit} />
      <UnitDetailedListComp
        unitList={props.units}
        deleteUnit={props.deleteUnit}
      />
    </div>
  );
}
