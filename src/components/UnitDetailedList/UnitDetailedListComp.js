import React, { setState } from "react";
import UnitDetailedListGenerate from "./UnitDetailedListGenerate";

import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";

export default function UnitDetailedListComp({ unitList, deleteUnit }) {
  return (
    <React.Fragment>
      <Accordion>
        <UnitDetailedListGenerate unitList={unitList} deleteUnit={deleteUnit} />
      </Accordion>
    </React.Fragment>
  );
}
