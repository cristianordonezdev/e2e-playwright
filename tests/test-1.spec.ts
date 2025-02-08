import { test, expect } from '@playwright/test';

test.describe('Navegation en www.freerangetesters.com', () => {
  const sections = [
    { name: 'Cursos', url: '/cursos', titleExpected: 'Cursos' },
    { name: 'Udemy', url: '/udemy', titleExpected: 'Udemy' },
    { name: 'Recursos', url: '/recursos', titleExpected: 'Recursos' },
  ];

  for (const section of sections) {
    test(`Validation for redirecting to the section ${section.name}`, async ({ page }) => {
      await test.step('Go to the principal page', async () => {
        await page.goto('https://www.freerangetesters.com/');
        await expect(page).toHaveTitle('Free Range Testers');
      });

      await test.step(`When it does click to "${section.name}"`, async () => {
        await page.locator('#page_header').getByRole('link', { name: section.name, exact: true }).click();
        await page.waitForURL(`**${section.url}`);
      });

      await test.step(`Click on the link "${section.titleExpected}"`, async () => {
        await expect(page).toHaveTitle(section.titleExpected);
        console.log('clicking here');
      });
    });
  }
});