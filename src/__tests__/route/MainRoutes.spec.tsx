import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MainRoutes from "../../Routes/MainRoutes";

describe("MainRoutes", () => {
  test("Should render page Login", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <MainRoutes />
      </MemoryRouter>
    );
    const title = await screen.findByRole("heading", { name: "Login" });
    expect(title).toBeInTheDocument();
  });
  test("Should render page Sign Up", async () => {
    render(
      <MemoryRouter initialEntries={["/sign-up"]}>
        <MainRoutes />
      </MemoryRouter>
    );
    const title = await screen.findByRole("heading", { name: "Cadastre-se" });
    expect(title).toBeInTheDocument();
  });
  test("Should render page dashboard", async () => {
    render(
      <MemoryRouter initialEntries={["/DashBoard"]}>
        <MainRoutes />
      </MemoryRouter>
    );
    const title = await screen.findByRole("heading", { name: "DashBoard" });
    expect(title).toBeInTheDocument();
  });
  test("Should render page notFound", async () => {
    render(
      <MemoryRouter initialEntries={["/notFound"]}>
        <MainRoutes />
      </MemoryRouter>
    );
    const title = await screen.findByRole("heading", {
      name: "404 page not found",
    });
    expect(title).toBeInTheDocument();
  });
});
