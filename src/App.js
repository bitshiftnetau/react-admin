import React, { useState, setState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LocalNavbar from "./components/layout/Navbar";
import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText
} from "@trendmicro/react-sidenav";

import DashboardSection from "./components/sections/DashboardSection";
import UnitsSection from "./components/sections/UnitsSection";
import WellbeingSection from "./components/sections/WellbeingSection";
import WorkSection from "./components/sections/WorkSection";
import FinancesSection from "./components/sections/FinancesSection";

import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import "bootstrap/dist/css/bootstrap.min.css";
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
      <div className="body-container">
        <div className="topnav-container">
          <LocalNavbar user={user} tier={tier} />
        </div>
        <Router>
          <Route
            render={({ location, history }) => (
              <React.Fragment>
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
                        <i
                          className="fa fa-fw fa-home"
                          style={{ fontSize: "1.75em" }}
                        />
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
                  </SideNav.Nav>
                </SideNav>

                <main>
                  <Route path="/" exact component={() => <div></div>} />
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
                </main>
              </React.Fragment>
            )}
          />
        </Router>
      </div>
    </div>
  );
}

export default App;
