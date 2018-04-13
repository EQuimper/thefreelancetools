import { TextInputField as Input } from 'evergreen-ui';
import * as React from 'react';

interface P {
  handleChange: (name: string, value: string) => void;
  handleBlur: (name: string) => void;
  name: string;
  value: string;
  placeholder: string;
  label: string;
  disabled: boolean;
  isInvalid: boolean;
  fullWidth?: boolean;
  isRequired?: boolean;
  errorMessage?: string;
}

class TextInput extends React.PureComponent<P> {
  static defaultProps = {
    isRequired: false,
  };

  _handleChange = (e: InputEvent) => {
    const { handleChange, name } = this.props;
    handleChange(name, e.target.value);
  }

  _handleBlur = () => {
    const { handleBlur, name } = this.props;
    handleBlur(name);
  }

  render() {
    const {
      name,
      value,
      placeholder,
      label,
      disabled,
      isInvalid,
      fullWidth,
      isRequired,
      errorMessage,
    } = this.props;

    const _style: any = {};

    if (fullWidth) {
      _style.width = '100%';
    }

    return (
      <Input
        name={name}
        onChange={this._handleChange}
        placeholder={placeholder}
        value={value}
        onBlur={this._handleBlur}
        disabled={disabled}
        isInvalid={isInvalid}
        label={label}
        required={isRequired}
        validationMessage={isInvalid && errorMessage}
        {..._style}
      />
    );
  }
}

export default TextInput;
