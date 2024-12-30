const { test, expect } = require("@playwright/test");

// Issue on Higo - Main Website

test("Test Invalid Localization Text when changing into EN language.", async ({
  page,
}) => {
  await page.goto("https://higo.id/");
  await page.getByRole("button", { name: "Close" }).click();
  await page.getByRole("link", { name: "Studi Kasus" }).click();
  await expect(page.getByRole("link", { name: "Abbott" })).toBeVisible();
  await page.getByRole("link", { name: "Abbott" }).click();
  await expect(page).toHaveURL("https://higo.id/case-study/abbott");
  await expect(page.getByText("Memiliki 3 produk")).toBeVisible();
  await expect(page.getByText("Konversi ke Youtube")).toBeVisible();
  await expect(page.getByText("untuk 3 produk")).toBeVisible();
  await page
    .locator('label.peer-checked\\:hidden[for="navigation-language"]')
    .click();
  await page.getByRole("link", { name: "English" }).click();
  await expect(page.getByText("With three products")).toBeVisible();
  await expect(page.getByText("Convert to Youtube")).toBeVisible();
  await expect(page.getByText("For 3 products")).toBeVisible();
});

test("Test Invalid Error Message when contact HIGO team.", async ({ page }) => {
  await page.goto("https://higo.id/");
  await page.reload();
  await page.getByRole("button", { name: "Close" }).click();
  await page.getByRole("link", { name: "Hubungi HIGO" }).click();
  await expect(page.getByText("Hubungi tim HIGO")).toBeVisible();
  await page.getByPlaceholder("ex.Clara").fill("HEHE");
  await page.getByPlaceholder("clara@gmail.com").fill("HOHO@hoho.hoho");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.locator("//section[2]/div/form/div[3]/p")).toBeVisible();
  await expect(page.locator("//section[2]/div/form/p")).toBeVisible(); // notes: must be reproduce by manual testing and changes this script automation base on business side
  await expect(page.locator("//section[2]/div/form/p")).toHaveCount(0);
});

// Blog Higo Side - Automation

test("Test search not found when search invalid keywords.", async ({
  page,
}) => {
  await page.goto("https://blog.higo.id/");
  await expect(page).toHaveTitle(
    "Artikel Seputar Teknologi, Digital Marketing, dan Tips Bisnis"
  );
  await page.getByPlaceholder("Cari Artikel").fill("HAHAHA");
  await page.getByRole("button", { name: "Cari Artikel" }).click();
  await expect(
    page.getByText('Artikel yang terkait dengan "HAHAHA" tidak ditemukan')
  ).toBeVisible();
});

test("Test searching found when search valid keywords.", async ({ page }) => {
  await page.goto("https://blog.higo.id/");
  await expect(page).toHaveTitle(
    "Artikel Seputar Teknologi, Digital Marketing, dan Tips Bisnis"
  );
  await page.getByPlaceholder("Cari Artikel").fill("bisnis");
  await page.getByRole("button", { name: "Cari Artikel" }).click();
  await expect(
    page.getByRole("button", { name: "Tampilkan lebih banyak" })
  ).toBeVisible();
});
