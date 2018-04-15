import { Pane, Text } from 'evergreen-ui';
import * as React from 'react';
import { pure, withHandlers } from 'recompose';

import { styled } from '@freelance-tool/commons';

interface P {
  name: string;
  id: string;
  onCardPress: (id: string) => void;
}

interface InjectedProps {
  onClick: () => void;
}

const enhance = withHandlers<P, InjectedProps>({
  onClick: (props: P) => () => props.onCardPress(props.id),
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

const ProjectCard = enhance(({ name, onClick, ...rest }: P & InjectedProps) => (
  <Card onClick={onClick} {...rest}>
    <Text>{name}</Text>
  </Card>
));

export default pure(ProjectCard);
