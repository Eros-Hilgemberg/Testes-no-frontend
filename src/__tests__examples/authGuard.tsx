import { AuthGuard } from "@/routes/authGuard";
import { AuthProvider } from "@/services/auth/authContext";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

// Mock do hook useAuth
vi.mock("../../hooks/useAuth", () => ({
  useAuth: () => ({
    signedIn: vi.fn(),
  }),
}));

const DummyComponent = () => <div>Conteúdo Protegido</div>;

describe("AuthGuard", async () => {
  it("redireciona para /login se não estiver autenticado e rota for privada", async () => {
    vi.doMock("../../hooks/useAuth", () => ({
      useAuth: () => ({ signedIn: false }),
    }));

    render(
      <AuthProvider>
        <MemoryRouter initialEntries={["/user"]}>
          <Routes>
            <Route element={<AuthGuard isPrivate />}>
              <Route path="/user" element={<DummyComponent />} />
            </Route>
            <Route path="/login" element={<h1>Página de Login</h1>} />
          </Routes>
        </MemoryRouter>
      </AuthProvider>
    );
    screen.debug();
    const title = await screen.findAllByRole("heading", {
      level: 1,
    });

    expect(title).toBeInTheDocument();
  });

  it("redireciona para / se estiver autenticado e rota for pública", () => {
    vi.doMock("../../hooks/useAuth", () => ({
      useAuth: () => ({ signedIn: true }),
    }));

    render(
      <MemoryRouter initialEntries={["/login"]}>
        <Routes>
          <Route element={<AuthGuard isPrivate={false} />}>
            <Route path="/login" element={<div>Página de Login</div>} />
          </Route>
          <Route path="/" element={<div>Home</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  it("renderiza o conteúdo protegido se estiver autenticado e rota for privada", () => {
    vi.doMock("../../hooks/useAuth", () => ({
      useAuth: () => ({ signedIn: true }),
    }));

    render(
      <MemoryRouter initialEntries={["/privado"]}>
        <Routes>
          <Route element={<AuthGuard isPrivate />}>
            <Route path="/privado" element={<DummyComponent />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Conteúdo Protegido")).toBeInTheDocument();
  });
});
