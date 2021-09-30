import React from "react";
import { screen } from "@testing-library/react";
import { render } from "./test-utils";
import { App } from "./App";

describe("App page", () => {
  it("initial render ", () => {
    render(<App />);

    screen.getByRole("heading", { name: "BROCCOLI & CO." });
    screen.getByRole("heading", { name: "A better way to enjoy every day." });
    screen.getByText("Be the first to know when we launch.");
    screen.getByRole("button", { name: "Request an invite" });
    screen.getByText("Made with ❤️ in Melbourne");
    screen.getByText("© 2016 Broccoli n Co. All rights reserved.");
  });
});
