import UserLogin, * as Login from "@/components/pages/user/userLogin";
import { fireEvent, screen } from "@testing-library/dom";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router";

describe("login", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.resetModules();
    vi.clearAllMocks();
  });

  test("verifica o login", async () => {
    render(
      <BrowserRouter>
        <UserLogin />
      </BrowserRouter>
    );
    screen.debug();
    const emailInput = await screen.findByPlaceholderText("Digite um email");
    const passwordInput = await screen.findByPlaceholderText(
      "Digite uma senha"
    );
    const button = await screen.findByRole("button", { name: "Salvar" });
    fireEvent.change(emailInput, {
      target: { value: "teste@gmail.com" },
    });
    fireEvent.change(passwordInput, {
      target: { value: "12345678" },
    });
    fireEvent.click(button);

    vi.spyOn(Login, "default");
    expect(Login.default).toHaveBeenCalledTimes(1);
  });
});
