import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import styled from 'styled-components';

import NewProjectForm from './NewProjectForm';

const CenterView = styled.div`
  display: grid;
  grid-auto-columns: minmax(40%, auto);
  grid-auto-rows: 500px;
  justify-content: center;
  align-items: center;
`;

const CenterDecorator = (storyFn: any) => <CenterView>{storyFn()}</CenterView>;

storiesOf('NewProjectForm', module)
  .addDecorator(CenterDecorator)
  .add('default', () => (
    <NewProjectForm handleSubmit={action('form-submit')} />
  ));
