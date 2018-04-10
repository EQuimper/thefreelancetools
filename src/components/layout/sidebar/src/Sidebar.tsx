import * as React from 'react';
import { NavLink, RouteComponentProps, withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { colors } from '../../../../constants';

const Root = styled.div`
  background-color: ${colors.sidebar};
  display: flex;
  flex-direction: column;
`;

const Item = styled.div`
  height: 50px;
  display: flex;
  padding: 0 16px;
  cursor: pointer;
  justify-content: flex-start;
  align-items: center;
`;

const activeClassName = 'nav-item-active';

const Nav = styled(NavLink).attrs({
  activeClassName,
})`
  font-size: 16px;
  text-decoration: none;
  color: #d5d8de;

  &.${activeClassName} {
    color: #fff;
  }
`;

type P = {} & RouteComponentProps<any>;

interface S {}

class Sidebar extends React.PureComponent<P, S> {
  state = {};
  render() {
    return (
      <Root>
        <Item>
          <Nav activeClassName={activeClassName} to="/current-timer">
            Current Timer
          </Nav>
        </Item>
        <Item>
          <Nav activeClassName={activeClassName} to="/new-project">
            New Project
          </Nav>
        </Item>
        <Item>
          <Nav activeClassName={activeClassName} to="/all-projects">
            All Projects
          </Nav>
        </Item>
      </Root>
    );
  }
}

export default withRouter(Sidebar);
