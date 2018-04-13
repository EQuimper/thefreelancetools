import { SegmentedControl as Segment } from 'evergreen-ui';
import * as React from 'react';
import { compose, onlyUpdateForKeys, withHandlers } from 'recompose';

interface P {
  name: string;
  options: Array<{
    label: string;
    value: string;
  }>;
  value: string;
  onSelect: (name: string, value: string) => void;
  defaultValue?: string;
  width?: number;
}

interface InjectedProps {
  onChange: () => void;
}

const SegmentedControl = ({
  name,
  options,
  value,
  onChange,
  ...rest,
}: P & InjectedProps) => (
  <Segment
    options={options}
    value={value}
    name={name}
    {...rest}
    onChange={onChange}
  />
);

export default compose<InjectedProps, P>(
  onlyUpdateForKeys(['value']),
  withHandlers({
    onChange: (props: P) => (value: string) =>
      props.onSelect(props.name, value),
  }),
)(SegmentedControl);
