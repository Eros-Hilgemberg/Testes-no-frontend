import { fireEvent, render, screen } from "@testing-library/react";
import SignUp from "../../pages/SignUp";

const navigateMock = vi.fn();

describe("SignUp", () => {
  vi.mock("react-router-dom", () => ({
    useNavigate() {
      return navigateMock;
    },
    Link: vi.fn().mockImplementation((props) => props.children),
  }));

  test("Should have 3 inputs in the screen", async () => {
    render(<SignUp />);

    const inputs = await screen.findAllByRole("textbox");

    expect(inputs).toHaveLength(3);
  });
  test("Should have inputs for name, email and password", async () => {
    render(<SignUp />);
    const inputName = await screen.findByPlaceholderText("Insira seu nome");
    const inputEmail = await screen.findByPlaceholderText("Insira seu email");
    const inputPassword = await screen.findByPlaceholderText(
      "Insira sua senha"
    );
    expect(inputName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
  });
  test("Should have button in the screen", async () => {
    render(<SignUp />);

    const button = await screen.findByRole("button");

    expect(button).toHaveTextContent("Sign Up");
  });
  test("Should have title 'Cadastre-se'", async () => {
    render(<SignUp />);

    const title = await screen.findByRole("heading", { level: 1 });

    expect(title).toHaveTextContent("Cadastre-se");
  });
  test("Should navigate for page dashboard", async () => {
    render(<SignUp />);
    const button = await screen.findByRole("button");
    fireEvent.click(button);
    expect(navigateMock).toHaveBeenCalledTimes(1);
  });
  test("Should navigate for page login", async () => {
    render(<SignUp />);
    const link = await screen.getByText("Já possui um cadastro? Clique aqui!");
    expect(link).toBeInTheDocument();
  });
});
