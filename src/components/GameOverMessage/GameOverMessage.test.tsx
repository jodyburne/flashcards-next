import GameOverMessage from ".";
import { render, screen } from "@testing-library/react";

const sampleProps = {
  failedCards: 1,
  getFailedCards: () => {},
};

describe("GameOverMessage component", () => {
  it("should render the redo message if there are failed cards", () => {
    render(<GameOverMessage {...sampleProps} />);
    const button = screen.getByRole("button");
    expect(button.innerHTML).toEqual("Redo failed cards?");
  });
  it("should not render the redo message if there are no failed cards", () => {
    render(<GameOverMessage {...sampleProps} failedCards={0} />);
    const button = screen.queryByRole("button");
    expect(button).toBeFalsy();
  });
  it("should render the success message if there are no failed cards", () => {
    render(<GameOverMessage {...sampleProps} failedCards={0} />);
    const heading = screen.getByRole("heading");
    expect(heading?.innerHTML).toEqual("Yay!");
  });
  it("should not render the success message if there are failed cards", () => {
    render(<GameOverMessage {...sampleProps} />);
    const heading = screen.queryByRole("heading");
    expect(heading).toBeFalsy();
  });
});
