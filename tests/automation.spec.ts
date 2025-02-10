import { test, expect, Browser, Page } from '@playwright/test';

(async () => {
  let browser: Browser;
  let page: Page;

  const textToWrite = 'Hello im filling this input';

  test.describe("Navegation to automation sandbox", () => {
    test("Click in button id dinamic", async ({ page }) => {
      
      await test.step("Go to the principal page", async () => {
  
        await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
      });

      await test.step("Click on buttin dinamic", async () => {
        const button = page.getByRole('button', { name: 'Hacé click para generar un ID' })
        await button.click();

        // Sometimes we need to force the click
        await button.click({ force: true });

        // For double click
        await button.dblclick();

        // For triple click
        await button.click({ clickCount: 3 });

        // For right click
        await button.click({button: 'right'});

        // For hover on container
        await button.hover();
      });
    });



    test("Fill fields of forms", async ({ page }) => {
      
      await test.step("Go to the principal page", async () => {
        await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
      });

      await test.step("Fill input", async () => {
        const input = page.getByRole('textbox', { name: 'Un aburrido texto' })
        await input.fill(textToWrite);
      });
    });

    test("Select checkboxes or ratios", async ({ page }) => {
      
      await test.step("Go to the principal page", async () => {
        await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
      });

      await test.step("Fill input", async () => {

        // For checkbox use check and uncheck
        await page.getByRole('checkbox', { name: 'Pizza 🍕' }).check();
        await page.getByRole('checkbox', { name: 'Pizza 🍕' }).uncheck();

        // For radio use check
        await page.getByRole('radio', { name: 'No' }).check();
      });
    });

    test("Selection of a item of select input", async ({ page }) => {
      
      await test.step("Go to the principal page", async () => {
        await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
      });

      await test.step("Select a item from the input", async () => {
        await page.getByLabel('Dropdown').selectOption({ label: 'Tennis' });
      });
    });

    test("Selection of a item of a dropdown", async ({ page }) => {
      
      await test.step("Go to the principal page", async () => {
        await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
      });

      await test.step("Select a item from the dropdown", async () => {
        // As you can kwno, dropdown it is little bit different from select input
        // We have a button initialy and then we have a list of items to click
        await page.getByRole('button', { name: 'Día de la semana' }).click();
        await page.getByRole('link', { name: 'Miércoles' }).click();
      });
    });

    test("Upload files", async ({ page }) => {
      
      await test.step("Go to the principal page", async () => {
        await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
      });

      await test.step("Add files", async () => {
        // An array for multiple files
        await page.getByLabel('Subí tu archivo').setInputFiles(['file.txt']);

        // Drag and drop behavior
        await page.getByLabel('Drag from').dragTo(page.getByLabel('Drop here'));
      });
    });
    
    
  });
})();