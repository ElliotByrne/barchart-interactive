import { render, screen } from "@testing-library/react";

import { Chart } from "./Chart";

describe("HelloWorld component", () => {
  it("should renders a msg", () => {
    // arrange
    render(<Chart msg="Hello React!" />);

    // act
    const title = screen.getByTestId("title");

    // assert
    expect(title).toHaveTextContent("The current time is");
  });
});
