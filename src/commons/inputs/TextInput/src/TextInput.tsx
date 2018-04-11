import { TextInput as Input } from 'evergreen-ui';
import * as React from 'react';

interface P {
  handleChange: (name: string, value: string) => void;
  handleBlur: (name: string) => void;
  name: string;
  value: string;
  placeholder: string;
  disabled: boolean;
  isInvalid: boolean;
  fullWidth?: boolean;
}

class TextInput extends React.PureComponent<P> {
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
      disabled,
      isInvalid,
      fullWidth,
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
        {..._style}
      />
    );
  }
}

export default TextInput;
