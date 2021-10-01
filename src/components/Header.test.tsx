import React from "react";
import { screen } from "@testing-library/react";
import { render } from "test-utils";
import { Header } from "components";

describe("Header component", () => {
  it("initial render ", () => {
    render(<Header />);

    screen.getByRole("heading", { name: "BROCCOLI & CO." });
  });
});
