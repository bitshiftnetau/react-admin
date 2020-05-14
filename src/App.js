import React, { useState, setState } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import OutsideClickHandler from 'react-outside-click-handler';
import LocalNavbar from "./components/layout/Navbar";
import SideNavComp from "./components/SideNavComp/SideNavComp";

import DashboardSection from "./components/sections/DashboardSection";
import UnitsSection from "./components/sections/UnitsSection";
import WellbeingSection from "./components/sections/WellbeingSection";
import WorkSection from "./components/sections/WorkSection";
import FinancesSection from "./components/sections/FinancesSection";
import TlogPathFinderSection from "./components/sections/TlogPathfinderSection.js";

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

var json_object = {
  "test0": "test0",
  "test1": "test1",
  "array0": [
    {"array0_el0": "0"},
    {"array0_el1": "1"},
    {"array0_el2": "2"},
    {"array0_el3": "3"},
    {"array0_el4": "4"},
  ]
}

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

  const sectionStyle = {
    marginLeft: "5em"
  };

  const deleteUnit = index => {
    const newUnitsList = [...units];
    newUnitsList.splice(index, 1);
    setUnits(newUnitsList);

    //FIXME: add calls to database here
  };

  return (
    <div className="App">
        <Router>
          <Route
            render={({ location, history }) => (
              <React.Fragment>
              

              <OutsideClickHandler
                onClickOutside={() => {
                  this.setState({ expanded: false });
                }}
              >
                    <SideNav
                      onSelect={selected => {
                        const to = "/" + selected;
                        if (location.pathname !== to) {
                          history.push(to);
                        }
                      }}
                    >

                      <SideNav.Toggle />

                        <SideNav.Nav defaultSelected="dashboard">
                          <NavItem eventKey="dashboard">
                              <NavIcon>
                                <i className="fa fa-fw fa-home" style={{ fontSize: "1.75em" }} />
                              </NavIcon>
                            <NavText>Dashboard</NavText>
                          </NavItem>
                          <NavItem eventKey="units">
                              <NavIcon>
                                <i
                                  className="fa fa-fw fa-device"
                                  style={{ fontSize: "1.75em" }}
                                />
                              </NavIcon>
                            <NavText>Units</NavText>
                          </NavItem>
                          <NavItem eventKey="wellbeing">
                              <NavIcon>
                                <i
                                  className="fa fa-fw fa-device"
                                  style={{ fontSize: "1.75em" }}
                                />
                              </NavIcon>
                            <NavText>Wellbeing</NavText>
                          </NavItem>
                          <NavItem eventKey="work">
                              <NavIcon>
                                <i
                                  className="fa fa-fw fa-device"
                                  style={{ fontSize: "1.75em" }}
                                />
                              </NavIcon>
                            <NavText>Work</NavText>
                          </NavItem>
                          <NavItem eventKey="finances">
                              <NavIcon>
                                <i
                                  className="fa fa-fw fa-device"
                                  style={{ fontSize: "1.75em" }}
                                />
                              </NavIcon>
                            <NavText>Finances</NavText>
                          </NavItem>
                          <NavItem eventKey="testing">
                              <NavIcon>
                                <i
                                  className="fa fa-fw fa-device"
                                  style={{ fontSize: "1.75em" }}
                                />
                              </NavIcon>
                            <NavText>Tlog Pathfinder</NavText>
                          </NavItem>

                         </SideNav.Nav>
                      </SideNav>
                    </OutsideClickHandler>
                <main>
                  <Route
                    exact
                    path="/"
                    render={() => <Redirect to="dashboard" />}
                  />
                  <Route
                    path="/dashboard"
                    component={() => (
                      <DashboardSection
                        style={sectionStyle}
                        units={units}
                        sections={sections}
                      />
                    )}
                  />
                  <Route
                    path="/units"
                    component={props => (
                      <UnitsSection
                        style={sectionStyle}
                        units={units}
                        addUnit={addUnit}
                        deleteUnit={deleteUnit}
                      />
                    )}
                  />
                  <Route
                    path="/wellbeing"
                    component={props => (
                      <WellbeingSection style={sectionStyle} />
                    )}
                  />
                  <Route
                    path="/testing"
                    component={props => (
                     <TlogPathFinderSection />
                    )}
                  />
                </main>
              </React.Fragment>
            )}
          />
        </Router>
    </div>
  );
}

export default App;

/*
                <SideNavComp location={location} history={history} />
                */