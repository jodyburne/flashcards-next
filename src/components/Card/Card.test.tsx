import Card from ".";
import { render, screen } from "@testing-library/react";

const childrenText = "hello";
describe("Card component", () => {
  it("should render the children it wraps", () => {
    render(<Card>{<p>{childrenText}</p>}</Card>);
    expect(screen.getByText(childrenText)).toBeTruthy();
  });
});
