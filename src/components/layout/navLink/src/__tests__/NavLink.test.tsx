import * as React from 'react';
import { render } from 'react-testing-library';

import { SidebarIconEnum } from '@freelance-tool/types';

import NavLink from '../NavLink';

describe('<NavLink />', () => {
  it('should render', () => {
    const handleLocationChange = jest.fn();
    const props = {
      isActive: false,
      title: 'Projects',
      to: '/projects',
      handleLocationChange,
      icon: SidebarIconEnum.PROJECTS,
    };
    render(<NavLink {...props} />);
  });
});
