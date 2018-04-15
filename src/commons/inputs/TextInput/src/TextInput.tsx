import { TextInputField as Input } from 'evergreen-ui';
import * as React from 'react';
import { compose, onlyUpdateForKeys, withHandlers } from 'recompose';

interface P {
  handleChange: (name: string, value: string) => void;
  handleBlur: (name: string) => void;
  name: string;
  value: string;
  placeholder: string;
  label?: string;
  disabled: boolean;
  isInvalid: boolean;
  fullWidth?: boolean;
  isRequired?: boolean;
  errorMessage?: string;
}

interface InjectedProps {
  onBlur: () => void;
  onChange: () => void;
}

const TextInput = ({
  name,
  value,
  placeholder,
  label,
  disabled,
  isInvalid,
  fullWidth = false,
  isRequired = false,
  errorMessage,
  onBlur,
  onChange,
}: P & InjectedProps) => {
  const _style: any = {};

  if (fullWidth) {
    _style.width = '100%';
  }
  return (
    <Input
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      value={value}
      onBlur={onBlur}
      disabled={disabled}
      isInvalid={isInvalid}
      label={label}
      required={isRequired}
      validationMessage={isInvalid && errorMessage}
      {..._style}
    />
  );
};

export default compose<InjectedProps, P>(
  onlyUpdateForKeys(['value', 'disabled', 'isInvalid', 'errorMessage']),
  withHandlers({
    onBlur: (props: P) => () => props.handleBlur(props.name),
    onChange: (props: P) => (e: InputEvent) =>
      props.handleChange(props.name, e.target.value),
  }),
)(TextInput);
