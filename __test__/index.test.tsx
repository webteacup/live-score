/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import Home from "@/pages/index";

describe("Home", () => {
  it("renders a heading", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", {
      name: /welcome to live score/i,
    });

    expect(heading).toBeInTheDocument();

    // Check if the card link is rendered
    const cardLink = screen.getByText(/contests page/i);
    expect(cardLink).toBeInTheDocument();
  });
});