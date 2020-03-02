import React, { setState } from "react";
import UnitDetailedListGenerate from "./UnitDetailedListGenerate";

export default function UnitDetailedListComp({ unitList, deleteUnit }) {
  return (
    <React.Fragment>
      <UnitDetailedListGenerate unitList={unitList} deleteUnit={deleteUnit} />
    </React.Fragment>
  );
}
