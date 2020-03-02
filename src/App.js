import React, { useState, setState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LocalNavbar from "./components/layout/Navbar";
import UnitList from "./components/UnitCounterList/UnitList";
import WellnessScaleComp from "./components/WellnessScale/WellnessScaleComp";
import DashboardGraphComp from "./components/DashboardGraph/DashboardGraphComp";
import UnitDetailedListComp from "./components/UnitDetailedList/UnitDetailedListComp";
import AddUnitComp from "./components/Modals/AddUnit/AddUnitComp";
import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText
} from "@trendmicro/react-sidenav";

import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import "bootstrap/dist/css/bootstrap.min.css";
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

    //FIXME: add calls to database here
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
              <SideNav
                onSelect={selected => {
                  const to = "/" + selected;
                  /*if (location.pathname !== to) {
                    history.push(to);
                  }*/
                }}
              >
                <SideNav.Toggle />
                <SideNav.Nav defaultSelected="home">
                  <NavItem eventKey="home">
                    <NavIcon>
                      <i
                        className="fa fa-fw fa-home"
                        style={{ fontSize: "1.75em" }}
                      />
                    </NavIcon>
                    <NavText>Home</NavText>
                  </NavItem>
                  <NavItem eventKey="devices">
                    <NavIcon>
                      <i
                        className="fa fa-fw fa-device"
                        style={{ fontSize: "1.75em" }}
                      />
                    </NavIcon>
                    <NavText>Devices</NavText>
                  </NavItem>
                </SideNav.Nav>
              </SideNav>
              <main>
                <Route
                  path="/"
                  exact
                  component={props => <DashboardGraphComp section={sections} />}
                />
                <Route
                  path="/home"
                  component={props => <DashboardGraphComp section={sections} />}
                />
                <Route
                  path="/devices"
                  component={props => <DashboardGraphComp section={sections} />}
                />
              </main>
            </React.Fragment>
          )}
        />
      </Router>

      <LocalNavbar user={user} tier={tier} />
      <UnitList unitList={units} />
      <WellnessScaleComp />

      <AddUnitComp addUnit={addUnit} />
      <UnitDetailedListComp unitList={units} deleteUnit={deleteUnit} />
    </div>
  );
}

export default App;
