import { Button } from "@/components/ui/button";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("Button", () => {
  it("should render the button", () => {
    render(<Button>Click me</Button>);
    const text = screen.getByText(/Click me/i);
    expect(text).toBeInTheDocument();
  });
  it("should render the button with a custom class", () => {
    render(<Button className="custom-class">Click me</Button>);
    const button = screen.getByText(/Click me/i);
    expect(button).toHaveClass("custom-class");
  });
});
