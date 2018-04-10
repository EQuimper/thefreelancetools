import { Text } from 'evergreen-ui';
import * as React from 'react';
import { compose, onlyUpdateForKeys, withHandlers } from 'recompose';
import styled from 'styled-components';

const Item = styled.div`
  height: 50px;
  display: flex;
  padding: 0 16px;
  cursor: pointer;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
`;

interface P {
  isActive: boolean;
  title: string;
  to: string;
  handleLocationChange: (path: string) => void;
  onClick?: () => void;
  children?: React.ReactNode;
}

const NavLink = ({ isActive, title, to, onClick }: P) => {
  let _color;

  if (isActive) {
    _color = '#fff';
  }
  return (
    <Item onClick={onClick}>
      <Text color={_color}>{title}</Text>
    </Item>
  );
};

export default compose<{}, P>(
  onlyUpdateForKeys(['isActive']),
  withHandlers({
    onClick: (props: P) => () => props.handleLocationChange(props.to),
  }),
)(NavLink);
