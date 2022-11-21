import React, { useState } from "react";

export interface InputProps {
  label: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
}

const Input = ({
  label,
  placeholder,
  value,
  setValue,
  type = "text",
}: InputProps) => {
  return (
    <div className="mt-1 space-x-2">
      <label htmlFor={label}>{label}:</label>
      <input
        data-testid="input-test"
        id={label}
        value={value}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        type={type}
        className="border border-dark-500"
      />
    </div>
  );
};

export default Input;
