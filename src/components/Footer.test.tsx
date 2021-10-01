import React from "react";
import { screen } from "@testing-library/react";
import { render } from "test-utils";
import { Footer } from "components";

describe("Footer component", () => {
  it("initial render ", () => {
    render(<Footer />);

    screen.getByText("Made with ❤️ in Melbourne");
    screen.getByText("© 2016 Broccoli n Co. All rights reserved.");
  });
});
