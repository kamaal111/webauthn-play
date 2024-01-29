import * as React from 'react';

function Input({
  name,
  placeholder,
  value,
  minLength,
  onChange,
  isValid = true,
  required = false,
  type = 'text',
}: {
  type?: React.HTMLInputTypeAttribute;
  name: string;
  placeholder: string;
  value: string;
  isValid?: boolean;
  required?: boolean;
  minLength?: number;
  onChange: (value: string) => void;
}) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      minLength={minLength}
      required={required}
      onChange={e => onChange(e.target.value)}
    />
  );
}

export default Input;
