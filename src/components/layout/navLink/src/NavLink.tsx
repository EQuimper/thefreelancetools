import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Text } from 'evergreen-ui';
import * as React from 'react';
import { compose, onlyUpdateForKeys, withHandlers } from 'recompose';
import { ThemedStyledProps } from 'styled-components';

import { styled } from '@freelance-tool/commons';
import { SidebarIconEnum, ThemeInterface } from '@freelance-tool/types';

const Item = styled.div`
  height: 50px;
  display: flex;
  padding: 0 16px;
  cursor: pointer;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
`;

interface IconProps {
  active: boolean;
}

const Icon = styled(FontAwesomeIcon)`
  color: ${(props: ThemedStyledProps<IconProps, ThemeInterface>) =>
    props.active ? '#fff' : props.theme.mainDark};
  margin-right: 10px;
`;

interface P {
  isActive: boolean;
  title: string;
  to: string;
  handleLocationChange: (path: string) => void;
  onClick?: () => void;
  children?: React.ReactNode;
  icon: SidebarIconEnum;
}

const NavLink = ({ isActive, title, to, onClick, icon }: P) => {
  let _color;

  if (isActive) {
    _color = '#fff';
  }

  return (
    <Item onClick={onClick}>
      {/* @ts-ignore */}
      {icon && <Icon icon={icon} active={isActive} />}
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
