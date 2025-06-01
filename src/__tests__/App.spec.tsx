import { render, screen } from "@testing-library/react";
import App from "../App";

describe("App", () => {
  test("should render two titles", async () => {
    render(<App />);
    const titles = await screen.findAllByRole("heading");

    expect(titles).toHaveLength(2);
  });
  test("should have one title 'Hello World' ", async () => {
    render(<App />);
    const title = await screen.findByRole("heading", { name: "Hello World" });

    expect(title).toBeInTheDocument();
  });
});
