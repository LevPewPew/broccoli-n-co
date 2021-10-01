import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CallToAction } from "components";

describe("CallToAction component", () => {
  const onButtonClickMock = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("initial render", () => {
    render(<CallToAction onButtonClick={onButtonClickMock} />);

    screen.getByRole("heading", { name: "A better way to enjoy every day." });
    screen.getByText("Be the first to know when we launch.");
    screen.getByRole("button", { name: "Request an invite" });
  });

  it("onButtonClick prop is called when button is clicked", async () => {
    render(<CallToAction onButtonClick={onButtonClickMock} />);

    const buttonElement = screen.getByRole("button", {
      name: "Request an invite",
    });

    userEvent.click(buttonElement);

    expect(onButtonClickMock).toBeCalledTimes(1);
  });
});
