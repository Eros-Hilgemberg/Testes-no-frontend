import { fireEvent, render, screen } from "@testing-library/react";
import Login from "../../pages/Login";

const navigateMock = vi.fn();

describe("Login", () => {
  vi.mock("react-router-dom", () => ({
    useNavigate() {
      return navigateMock;
    },
    Link: vi.fn().mockImplementation((props) => props.children),
  }));

  test("should title Login", async () => {
    render(<Login />);
    const title = await screen.getByRole("heading", { name: "Login" });
    expect(title).toBeInTheDocument();
  });
  test("should have two inputs in the screen", async () => {
    render(<Login />);
    const inputs = await screen.findAllByRole("textbox");
    expect(inputs).toHaveLength(2);
  });
  test("should have button in the screen with text 'Acessar'", async () => {
    render(<Login />);
    const button = await screen.findByRole("button");
    expect(button).toBeInTheDocument();
    expect(button.textContent).toBe("Acessar");
  });
  test("should have input email", async () => {
    render(<Login />);
    const input = await screen.findByPlaceholderText("insira seu email");
    expect(input).toBeInTheDocument();
  });
  test("should have input password", async () => {
    render(<Login />);
    const input = await screen.findByPlaceholderText("insira sua senha");
    expect(input).toBeInTheDocument();
  });

  test("should have button function", async () => {
    render(<Login />);
    const button = await screen.findByRole("button");
    fireEvent.click(button);
    expect(navigateMock).toHaveBeenCalledTimes(1);
  });

  test("Should navigate for page Sign Up", async () => {
    render(<Login />);
    const link = await screen.getByText("Não possui um cadastro? Clique aqui!");
    expect(link).toBeInTheDocument();
  });
});
