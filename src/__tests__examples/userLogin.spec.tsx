import { useAuth } from "@/hooks/useAuth";
import { AuthProvider } from "@/services/auth/authContext";
import { act, render, renderHook } from "@testing-library/react";
import { BrowserRouter } from "react-router";

const authContextValue = {
  signedIn: null,
  signIn: vi.fn().mockImplementation((email: string, password: string) => {
    return Promise.resolve({ signedIn: true });
  }),
  signOut: vi.fn(),
};

beforeEach(() => {
  globalThis.fetch = vi.fn().mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve([]),
    })
  );

  vi.spyOn(window, "alert").mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("UserLogin", () => {
  test("<AuthProvider />", async () => {
    const Consumer = () => {
      const { signIn, signOut, signedIn, signedUserId } = useAuth();

      signIn("teste@gmail.com", "teste1234");

      const result = signIn("teste@gmail.com", "teste1234");
      return <p>hello, world!</p>;
    };

    act(async () => {
      render(
        <AuthProvider>
          <Consumer />
        </AuthProvider>,
        {
          wrapper: BrowserRouter,
        }
      );
    });
    expect(Consumer).toBeDefined();
  });

  test.skip("useAuth", async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: ({ children }) => <AuthProvider>{children}</AuthProvider>,
    });

    expect(result.current.signedIn).toBeNull();
    expect(result.current.signIn).toBeDefined();
    expect(result.current.signOut).toBeDefined();
    expect(result.current.signedUserId).toBeUndefined();

    await act(async () => {
      await result.current.signIn(
        "${authContextValue.signedUserId}",
        "teste1234"
      );
    });
  });
});
