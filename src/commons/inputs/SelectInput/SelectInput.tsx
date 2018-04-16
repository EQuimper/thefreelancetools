import { Combobox } from 'evergreen-ui';
import * as React from 'react';
import { compose, onlyUpdateForKeys, withHandlers } from 'recompose';

interface OptionItem {
  label: string;
  value: string;
}

interface InjectedProps {
  onChange: (value: OptionItem) => void;
}

interface P {
  items: OptionItem[];
  handleChange: (name: string, value: OptionItem) => void;
  selectedItem: OptionItem | null;
  name: string;
  title?: string;
  openOnFocus?: boolean;
  width?: number;
}

const SelectInput = ({
  items,
  onChange,
  selectedItem,
  title,
  openOnFocus = true,
  width,
}: P & InjectedProps) => (
  <Combobox
    placeholder="Project"
    width={width}
    autocompleteProps={{
      title: title,
      itemsFilter: (els: OptionItem[], input: string) =>
        els.filter(el => el.label.toLowerCase().includes(input.toLowerCase())),
    }}
    openOnFocus={openOnFocus}
    items={items}
    onChange={onChange}
    itemToString={(i: OptionItem) => (i ? i.label : '')}
    selectedItem={selectedItem}
  />
);

export default compose<InjectedProps, P>(
  onlyUpdateForKeys(['items', 'value', 'selectedItem']),
  withHandlers({
    onChange: (props: P) => (value: OptionItem) =>
      props.handleChange(props.name, value),
  }),
)(SelectInput);
