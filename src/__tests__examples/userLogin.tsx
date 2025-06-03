import UserLogin from "@/components/pages/user/userLogin";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { toast } from "sonner";

//mocks
vi.mock("./src/hooks/useAuth", () => ({
  useAuth: () => ({
    useAuth: vi.fn(),
  }),
}));

vi.mock("react-router", () => ({
  useNavigate: () => vi.fn(),
  Link: vi.fn().mockImplementation((props) => props.children),
}));

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe.skip("UserLogin - onSumbmit", () => {
  const mockSignIn = vi.fn();
  const mockNavigate = vi.fn();
  // beforeEach(() => {
  //   // Atualiza os mocks para cada teste
  //   vi.mocked(require("./src/hooks/useAuth").useAuth).mockReturnValue({
  //     signIn: mockSignIn,
  //   });

  //   vi.mocked(require("react-router").useNavigate).mockReturnValue(
  //     mockNavigate
  //   );
  //   vi.clearAllMocks();
  // });
  beforeEach(() => {
    class MockIntersectionObserver {
      root = null;
      rootMargin = "";
      thresholds = [];
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();
      takeRecords = vi.fn();
      constructor() {}
    }
    global.IntersectionObserver =
      MockIntersectionObserver as unknown as typeof IntersectionObserver;
  });

  it("deve realizar login com sucesso", async () => {
    vi.mock("./src/hooks/useAuth", () => ({
      useAuth: () => ({
        useAuth: vi.fn(),
      }),
    }));
    mockSignIn.mockResolvedValueOnce({});

    render(<UserLogin />);

    await fireEvent.input(screen.getByPlaceholderText("Digite um email"), {
      target: { value: "test@example.com" },
    });
    await fireEvent.input(screen.getByPlaceholderText("Digite uma senha"), {
      target: { value: "123456" },
    });

    await fireEvent.click(screen.getByRole("button", { name: "Salvar" }));

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith("test@example.com", "123456");
      expect(toast.success).toHaveBeenCalledWith("Sucesso ao realizar login!");
      expect(mockNavigate).toHaveBeenCalledWith("/user");
    });
  });
});
