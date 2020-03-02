import React, { useState, setState } from "react";
import Navbar from "./components/layout/Navbar";
import UnitList from "./components/UnitCounterList/UnitList";
import WellnessScaleComp from "./components/WellnessScale/WellnessScaleComp";
import DashboardGraphComp from "./components/DashboardGraph/DashboardGraphComp";
import UnitDetailedListComp from "./components/UnitDetailedList/UnitDetailedListComp";
import AddUnitComp from "./components/Modals/AddUnit/AddUnitComp";

import "./app.css";
import uuid from "uuid";
import { state } from "./fakedata.js";

function App() {
  // useState() returns an array
  // we can use array destructuring to access elements of that array
  // useState() always returns two items:
  // 1. the original state, denoted below by 'state'
  // 2. a function to alter the state, denoted below by 'setState'
  // these items can be called whatever we want, they just need to be defined

  const [user, setUser] = useState("Aidan Millar-Powell");
  const [tier, setTier] = useState("paid");

  const [units, setUnits] = useState(state.units);
  const [sections, setSections] = useState(state.sections);

  var addUnit = (unitnum, unitname, unitcontent) => {
    const newUnits = [
      ...units,
      { name: unitname, number: unitnum, content: unitcontent }
    ];
    setUnits(newUnits);
  };

  const deleteUnit = index => {
    const newUnitsList = [...units];
    newUnitsList.splice(index, 1);
    setUnits(newUnitsList);
  };

  return (
    <div className="App">
      <Navbar user={user} tier={tier} />
      <UnitList unitList={units} />
      <WellnessScaleComp />
      <DashboardGraphComp section={sections} />
      <AddUnitComp addUnit={addUnit} />
      <UnitDetailedListComp unitList={units} deleteUnit={deleteUnit} />
    </div>
  );
}

export default App;
