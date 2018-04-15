import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import styled from 'styled-components';

import ProjectCard from './ProjectCard';

const CenterView = styled.div`
  display: grid;
  grid-auto-columns: minmax(30%, auto);
  grid-auto-rows: 500px;
  justify-content: center;
  align-items: center;
`;

const CenterDecorator = (storyFn: any) => <CenterView>{storyFn()}</CenterView>;

storiesOf('ProjectCard', module)
  .addDecorator(CenterDecorator)
  .add('default', () => (
    <ProjectCard id="123" onClick={action('card-press')} name="MyProject" />
  ));
