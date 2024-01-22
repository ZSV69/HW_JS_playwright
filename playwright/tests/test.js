const { test, expect, chromium } = require("@playwright/test");
const {userEmail, userPassword} = require("../user");

test("test success auth", async ({ page }) => {
    await page.goto("https://netology.ru/?modal=sign_in");
    await page.locator('[placeholder="Email"]').click();
    await page.locator('[placeholder="Email"]').fill(userEmail);
    await page.locator('[placeholder="Пароль"]').click();
    await page.locator('[placeholder="Пароль"]').fill(userPassword);
    await page.locator('[data-testid="login-submit-btn"]').click();
    await page.waitForURL("https://netology.ru/profile", { timeout: 5000 });
    const header = await page.locator("h2").first();
    await expect(header).toHaveText("Моё обучение");
    await browser.close();
});

test("test not success auth", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.locator('[placeholder="Email"]').click();
  await page.locator('[placeholder="Email"]').fill("neto@mail.ru");
  await page.locator('[placeholder="Пароль"]').click();
  await page.locator('[placeholder="Пароль"]').fill("qwe123");
  await page.locator('[data-testid="login-submit-btn"]').click();
  await expect(page.locator("[data-testid=login-error-hint]")).toContainText(
    "Вы ввели неправильно логин или пароль"
  );
});