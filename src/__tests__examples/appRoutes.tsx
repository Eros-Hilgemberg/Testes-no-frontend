import { describe, expect, it } from "vitest";

import { router } from "@/routes/appRoutes";
describe("appRoutes", () => {
  it("deve conter a rota de login", () => {
    const route = router.routes.find((r) => r.path === "/login");
    expect(route).toBeDefined();
  });

  it("deve conter a rota de registro", () => {
    const route = router.routes.find((r) => r.path === "/register");
    expect(route).toBeDefined();
  });

  it("deve conter a rota de not found", () => {
    const route = router.routes.find((r) => r.path === "*");
    expect(route).toBeDefined();
  });

  // it("deve conter rotas privadas com AuthGuard", () => {
  //   const privateRoute = router.routes.find(
  //     (r) => r.element?.type?.name === "AuthGuard"
  //   );
  //   expect(privateRoute).toBeDefined();
  //   expect(privateRoute.children[0].Component.name).toBe("BasePageLayout");
  // });
});
