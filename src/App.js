import React, { useState, setState } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { StickyContainer, Sticky } from 'react-sticky';
import OutsideClickHandler from 'react-outside-click-handler';
import LocalNavbar from "./components/layout/Navbar";
import SideNavComp from "./components/SideNavComp/SideNavComp";

import DashboardSection from "./components/sections/DashboardSection";
import UnitsSection from "./components/sections/UnitsSection";
import WellbeingSection from "./components/sections/WellbeingSection";
import WorkSection from "./components/sections/WorkSection";
import FinancesSection from "./components/sections/FinancesSection";
import TlogPathFinderSectionMemo from "./components/sections/TlogPathfinderSection.js";

import JsonPathPickerComp from "./components/JsonPathPicker/JsonPathPickerComp";


import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText
} from "@trendmicro/react-sidenav";


import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import "bootstrap/dist/css/bootstrap.min.css";
import uuid from "uuid";
import { state } from "./fakedata.js";
import { state_data } from "./state_data";



const tlog_path_picker_state = {
  json: "",
  path: "",
  pathText: ''
}

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

  const [navbarState, setNavbarState] = useState(state_data.navbar);
  const [sectionState, setSectionState] = useState(state_data.section_state);

  /*
  const [jsonPickerState, setJsonPickerState] = useState(json_picker_state);
  const [jsonPickerProps, setJsonPickerProps] = useState(json_picker_props);
  */

  var addUnit = (unitnum, unitname, unitcontent) => {
    const newUnits = [
      ...units,
      { name: unitname, number: unitnum, content: unitcontent }
    ];
    setUnits(newUnits);

    //FIXME: add calls to database here
  };

  const deleteUnit = index => {
    const newUnitsList = [...units];
    newUnitsList.splice(index, 1);
    setUnits(newUnitsList);

    //FIXME: add calls to database here
  };

  const shiftSection = () => {
    setSectionState({
      style:{
        marginLeft: "16em"
      }
    });
    console.log("shift section");
  }

  return (
    <div className="App">
      <div>
        <TlogPathFinderSectionMemo style={{"overflow": "auto"}}/>
      </div>
   </div>
  );
}

export default App;
