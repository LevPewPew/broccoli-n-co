import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import { InviteForm } from "components";

// NEXT remove this stuff???
// this is here to suppress a bug in react-hook-form causing false act warning
/* eslint-disable no-alert, no-console */
const originalError = console.error.bind(console.error);
beforeAll(() => {
  console.error = (msg: any) => {
    !msg.toString().includes("was not wrapped in act") && originalError(msg);
  };
});

afterAll(() => {
  console.error = originalError;
});
/* eslint-enable no-alert, no-console */

describe("InviteForm component", () => {
  const onSubmitMock = jest.fn();

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("initial render", () => {
    render(<InviteForm onSubmit={onSubmitMock} />);

    screen.getByRole("textbox", {
      name: "Full name",
    });
    screen.getByRole("textbox", {
      name: "Email",
    });
    screen.getByRole("textbox", {
      name: "Confirm email",
    });
    screen.getByRole("button", {
      name: "Submit",
    });
  });

  it("onSubmit prop is called when submit button is clicked and response is OK200", async () => {
    render(<InviteForm onSubmit={onSubmitMock} />);

    const submitButtonElement = screen.getByRole("button", {
      name: "Submit",
    });

    userEvent.click(submitButtonElement);

    await waitFor(() => expect(onSubmitMock).toBeCalledTimes(1));
  });
});
