import { describe, test, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act, renderHook } from "@testing-library/react-hooks";
import { useState } from "react";
import Button from "../components/Button/button";

describe("Input", () => {
  describe("Rendering", () => {
    test("Render out button", async () => {
      render(<Button text="text" onClick={() => console.log("hi")} />);
      expect(screen.getByText("text")).toBeInTheDocument();
    });

    test("onClick triggered", async () => {
      const { result } = renderHook(() => useState(0));
      render(
        <Button
          text="text"
          onClick={() => result.current[1]((prev) => prev + 1)}
        />
      );
      expect(result.current[0]).toBe(0);
      await act(async () => {
        await userEvent.click(screen.getByTestId("button-test"));
      });
      expect(result.current[0]).toBe(1);
    });
  });
});
