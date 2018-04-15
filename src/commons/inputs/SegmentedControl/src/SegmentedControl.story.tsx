import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import styled from 'styled-components';

import SegmentedControl from './SegmentedControl';

const CenterView = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 500px;
`;

const CenterDecorator = (storyFn: any) => <CenterView>{storyFn()}</CenterView>;

storiesOf('SegmentedControl', module)
  .addDecorator(CenterDecorator)
  .add('default', () => (
    <SegmentedControl
      name="light"
      value=""
      width={200}
      options={[{ label: 'on', value: 'on' }, { label: 'off', value: 'off' }]}
      onSelect={action('segment-select')}
    />
  ));
