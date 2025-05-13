import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("http://localhost:3000");

  // Espera a que la página cargue completamente
  // para asegurarse de que los metadatos (título) estén disponibles
  await page.waitForTimeout(500);

  // El título de la página debe ser "KOTOBA".
  await expect(page).toHaveTitle(/KOTOBA/);
});

test("logo links to the homepage", async ({ page }) => {
  await page.goto("http://localhost:3000");

  // Busca el logo de la página mediante su atributo alt
  const logo = page.locator('img[alt="Kotoba Logo"]');

  // Recupera el enlace del logo
  const link = logo.locator("..");

  // Verifica que el enlace dirija a la página de inicio
  await expect(link).toHaveAttribute("href", "/");
});
