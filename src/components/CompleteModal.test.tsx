import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CompleteModal } from "components";

describe("CompleteModal component", () => {
  const onCloseMock = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe("with confirm prop", () => {
    const titleDummy = "apple";
    const childrenTextDummy = "foobar";

    it("initial render", () => {
      render(
        <CompleteModal
          onClose={onCloseMock}
          isOpen={true}
          title={titleDummy}
          confirm
        >
          <div>{childrenTextDummy}</div>
        </CompleteModal>
      );

      screen.getByRole("dialog", { name: titleDummy });
      screen.getByText(childrenTextDummy);
      screen.getByRole("button", { name: "Close" });
      screen.getByRole("button", { name: "OK" });
    });

    it("onClose prop is called when close button is clicked", () => {
      render(
        <CompleteModal
          onClose={onCloseMock}
          isOpen={true}
          title={titleDummy}
          confirm
        >
          <div>{childrenTextDummy}</div>
        </CompleteModal>
      );

      const closeButtonElement = screen.getByRole("button", { name: "Close" });

      userEvent.click(closeButtonElement);

      expect(onCloseMock).toBeCalledTimes(1);
    });

    it("onClose prop is called when OK button is clicked", () => {
      render(
        <CompleteModal
          onClose={onCloseMock}
          isOpen={true}
          title={titleDummy}
          confirm
        >
          <div>{childrenTextDummy}</div>
        </CompleteModal>
      );

      const okButtonElement = screen.getByRole("button", { name: "OK" });

      userEvent.click(okButtonElement);

      expect(onCloseMock).toBeCalledTimes(1);
    });
  });

  describe("with NO confirm prop", () => {
    const titleDummy = "apple";
    const childrenTextDummy = "foobar";

    it("initial render", () => {
      render(
        <CompleteModal onClose={onCloseMock} isOpen={true} title={titleDummy}>
          <div>{childrenTextDummy}</div>
        </CompleteModal>
      );

      screen.getByRole("dialog", { name: titleDummy });
      screen.getByText(childrenTextDummy);
      screen.getByRole("button", { name: "Close" });
    });

    it("onClose prop is called when close button is clicked", () => {
      render(
        <CompleteModal
          onClose={onCloseMock}
          isOpen={true}
          title={titleDummy}
          confirm
        >
          <div>{childrenTextDummy}</div>
        </CompleteModal>
      );

      const closeButtonElement = screen.getByRole("button", { name: "Close" });

      userEvent.click(closeButtonElement);

      expect(onCloseMock).toBeCalledTimes(1);
    });
  });
});
