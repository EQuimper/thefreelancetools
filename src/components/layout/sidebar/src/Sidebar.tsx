import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { colors } from '../../../../constants';
import { NavLink } from '../../index';

const Root = styled.div`
  background-color: ${colors.sidebar};
  display: flex;
  flex-direction: column;
`;

const LINKS = [
  {
    to: '/new-project',
    title: 'New Project',
  },
  {
    to: '/all-projects',
    title: 'All Projects',
  },
  {
    to: '/invoices',
    title: 'Invoices',
  },
  {
    to: '/time-tracker',
    title: 'Time Tracker',
    icon: 'clock',
  },
];

type P = {} & RouteComponentProps<any>;

interface S {}

class Sidebar extends React.PureComponent<P, S> {
  state = {};

  _handleLocationChange = (path: string) => {
    this.props.history.push(path);
  }

  render() {
    return (
      <Root>
        {LINKS.map(el => (
          <NavLink
            key={el.to}
            to={el.to}
            handleLocationChange={this._handleLocationChange}
            isActive={this.props.location.pathname === el.to}
            title={el.title}
          />
        ))}
      </Root>
    );
  }
}

export default withRouter(Sidebar);
