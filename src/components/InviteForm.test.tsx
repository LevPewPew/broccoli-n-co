import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InviteForm } from "components";

describe("InviteForm component", () => {
  const onSubmitMock = jest.fn();

  beforeEach(() => {
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

  it("onSubmit prop is called when submit button is clicked on a valid form", async () => {
    const fullNameDummy = "Foo Bar";
    const emailDummy = "foobar@email.com";
    const confirmEmailDummy = "foobar@email.com";

    render(<InviteForm onSubmit={onSubmitMock} />);

    const fullNameInputElement = screen.getByRole("textbox", {
      name: "Full name",
    });
    const emailInputElement = screen.getByRole("textbox", {
      name: "Email",
    });
    const confirmEmailInputElement = screen.getByRole("textbox", {
      name: "Confirm email",
    });
    const submitButtonElement = screen.getByRole("button", {
      name: "Submit",
    });

    userEvent.type(fullNameInputElement, fullNameDummy);
    userEvent.type(emailInputElement, emailDummy);
    userEvent.type(confirmEmailInputElement, confirmEmailDummy);
    userEvent.click(submitButtonElement);

    await waitFor(() =>
      screen.getByRole("button", { name: "Loading... Submit" })
    );
    await waitFor(() => expect(onSubmitMock).toBeCalledTimes(1));
    await waitFor(() =>
      expect(onSubmitMock).toHaveBeenCalledWith({
        fullName: fullNameDummy,
        email: emailDummy,
        confirmEmail: confirmEmailDummy,
      })
    );
  });

  it("onSubmit is NOT called, and validation error is shown, when Full name is less than 3 characters", async () => {
    const fullNameDummy = "Fo";
    const emailDummy = "fo@email.com";
    const confirmEmailDummy = "fo@email.com";

    render(<InviteForm onSubmit={onSubmitMock} />);

    const fullNameInputElement = screen.getByRole("textbox", {
      name: "Full name",
    });
    const emailInputElement = screen.getByRole("textbox", {
      name: "Email",
    });
    const confirmEmailInputElement = screen.getByRole("textbox", {
      name: "Confirm email",
    });
    const submitButtonElement = screen.getByRole("button", {
      name: "Submit",
    });

    userEvent.type(fullNameInputElement, fullNameDummy);
    userEvent.type(emailInputElement, emailDummy);
    userEvent.type(confirmEmailInputElement, confirmEmailDummy);
    userEvent.click(submitButtonElement);

    await waitFor(() => screen.getByText("Minimum of 3 characters"));
    await waitFor(() => expect(onSubmitMock).not.toBeCalled());
  });

  it("onSubmit is NOT called, and validation error is shown, when emails do not match", async () => {
    const fullNameDummy = "Foober";
    const emailDummy = "fizz@email.com";
    const confirmEmailDummy = "buzz@email.com";

    render(<InviteForm onSubmit={onSubmitMock} />);

    const fullNameInputElement = screen.getByRole("textbox", {
      name: "Full name",
    });
    const emailInputElement = screen.getByRole("textbox", {
      name: "Email",
    });
    const confirmEmailInputElement = screen.getByRole("textbox", {
      name: "Confirm email",
    });
    const submitButtonElement = screen.getByRole("button", {
      name: "Submit",
    });

    userEvent.type(fullNameInputElement, fullNameDummy);
    userEvent.type(emailInputElement, emailDummy);
    userEvent.type(confirmEmailInputElement, confirmEmailDummy);
    userEvent.click(submitButtonElement);

    await waitFor(() => screen.getByText("Emails do not match"));
    await waitFor(() => expect(onSubmitMock).not.toBeCalled());
  });
});
