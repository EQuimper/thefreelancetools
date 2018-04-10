import { Text } from 'evergreen-ui';
import * as React from 'react';
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

class Sidebar extends React.PureComponent {
  state = {};
  render() {
    return (
      <Root>
        <Item>
          <Text color="white">Current Timer</Text>
        </Item>
        <Item>
          <Text color="white">NewProject</Text>
        </Item>
        <Item>
          <Text color="white">All Projects</Text>
        </Item>
      </Root>
    );
  }
}

export default Sidebar;
