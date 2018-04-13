import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { styled } from '@freelance-tool/commons';
import { SidebarIconEnum } from '@freelance-tool/types';

import { NavLink } from '../../index';

const Root = styled.div`
  background-color: ${props => props.theme.sidebarBackground};
  display: flex;
  flex-direction: column;
`;

const LINKS: Array<{
  to: string;
  title: string;
  icon: SidebarIconEnum;
}> = [
  {
    to: '/projects',
    title: 'Projects',
    icon: SidebarIconEnum.PROJECTS,
  },
  {
    to: '/invoices',
    title: 'Invoices',
    icon: SidebarIconEnum.INVOICES,
  },
  {
    to: '/clients',
    title: 'Clients',
    icon: SidebarIconEnum.CLIENTS,
  },
  {
    to: '/time-tracker',
    title: 'Time Tracker',
    icon: SidebarIconEnum.TIME_TRACKER,
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
            icon={el.icon}
          />
        ))}
      </Root>
    );
  }
}

export default withRouter(Sidebar);
