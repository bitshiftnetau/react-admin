import React from "react";
import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText
} from "@trendmicro/react-sidenav";

export default function SideNavComp(props) {
  const { location, history } = props;

  return (
    <div>
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
        </SideNav.Nav>
      </SideNav>
    </div>
  );
}
