import { Pane, Text } from 'evergreen-ui';
import * as React from 'react';
import { pure, withHandlers } from 'recompose';

import { styled } from '@freelance-tool/commons';

interface P {
  name: string;
  id: string;
  onClick: (id: string) => void;
}

interface InjectedProps {
  onCardPress: () => void;
}

const enhance = withHandlers<P, InjectedProps>({
  onCardPress: (props: P) => () => props.onClick(props.id),
});

const Card = styled(Pane).attrs({
  appearance: 'tint3',
  elevation: 1,
  hoverElevation: 3,
})`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 5px;
  min-height: 170px;
`;

const ProjectCard = enhance(
  ({ name, onCardPress, ...rest }: P & InjectedProps) => (
    <Card onClick={onCardPress} {...rest}>
      <Text>{name}</Text>
    </Card>
  ),
);

export default pure(ProjectCard);
