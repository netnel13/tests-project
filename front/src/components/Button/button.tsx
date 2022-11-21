import React from "react";

export interface ButtonProps {
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ text, onClick }: ButtonProps) => {
  return (
    <button
      data-testid="button-test"
      className="bg-blue-400 py-1 px-3"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
