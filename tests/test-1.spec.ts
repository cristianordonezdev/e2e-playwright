import { test, Browser, Page, expect } from '@playwright/test';

(async () => {
  let browser: Browser;
  let page: Page;

  test.describe('Navegation en www.freerangetesters.com', () => {
    test('open links', async ({ page }) => {
      await test.step('Go to the page ', async () => {
        page.goto('https://www.freerangetesters.com/')
        await expect(page).toHaveTitle('Free Range Testers')
      })

      await test.step('Click on the link "Cursos"', async () => {
        page.locator('#page_header').getByRole('link', { name: 'Cursos', exact: true }).click()
        await page.waitForURL("**/cursos")
      })

      await test.step('Click on the link "Blog"', async () => {
        await expect(page).toHaveTitle("Cursos")
        console.log('clicking here')
      })
    })
  })
})();