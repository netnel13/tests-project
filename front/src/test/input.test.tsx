import { describe, test, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "@testing-library/react-hooks";
import Input, { InputProps } from "../components/Input/Input";
import { useState } from "react";

describe("Input", () => {
  const InputUnderTest = ({
    placeholder,
    label,
    value,
  }: Omit<InputProps, "setValue">) => {
    const [innerValue, setInnerValue] = useState<string>(value);
    return (
      <Input
        value={innerValue}
        setValue={setInnerValue}
        label={label}
        placeholder={placeholder}
      />
    );
  };
  describe("Rendering", () => {
    test("Render out Input", async () => {
      render(<InputUnderTest placeholder="test" label="test" value={""} />);
      expect(screen.getByText("test:")).toBeInTheDocument();
    });

    test("value to be undefined", async () => {
      render(<InputUnderTest placeholder="test" label="test" value={""} />);
      expect(screen.getByTestId("input-test")).toHaveValue("");
    });

    test("fire onChange event", async () => {
      render(<InputUnderTest placeholder="test" label="test" value={""} />);
      await act(async () => {
        await userEvent.type(screen.getByTestId("input-test"), "a");
      });
      expect(screen.getByTestId("input-test")).toHaveValue("a");
    });
  });
});
