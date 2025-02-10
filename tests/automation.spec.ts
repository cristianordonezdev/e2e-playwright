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

    test("Assertion to validate when it is clicked a button, the text appear", async ({ page }) => {
      
      await test.step("Go to the principal page", async () => {
  
        await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
      });

      await test.step("Click on buttin dinamic", async () => {
        const button = page.getByRole('button', { name: 'Hacé click para generar un ID' })
        await button.click();

        await expect(page.getByText('OMG, aparezco después de 3')).toBeVisible();
      });
    });



    test("Fill fields of forms", async ({ page }) => {
      
      await test.step("Go to the principal page", async () => {
        await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
      });

      await test.step("Fill input", async () => {
        const input = page.getByRole('textbox', { name: 'Un aburrido texto' })

        // Validate if it is editable
        await expect(input).toBeEditable();
        await input.fill(textToWrite);
        // Validate if it is filled
        await expect(input).toHaveValue(textToWrite);
      });
    });

    test("Select checkboxes or ratios", async ({ page }) => {
      
      await test.step("Go to the principal page", async () => {
        await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
      });

      await test.step("Fill input", async () => {
        const checkbox = page.getByRole('checkbox', { name: 'Pizza 🍕' });
        // For checkbox use check and uncheck
        await checkbox.check();
        await expect(checkbox).toBeChecked();

        await checkbox.uncheck();
        //  A second element on assertion it is a custom comment
        await expect(checkbox, 'Checkbox was selected').not.toBeChecked();

        // For radio use check
        await page.getByRole('radio', { name: 'No' }).check();
      });
    });

    test("Selection of a item of select input", async ({ page }) => {
      
      await test.step("Go to the principal page", async () => {
        await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
      });

      await test.step("Select a item from the input", async () => {
        const dropdown = page.getByLabel('Dropdown');
        const sports = ['Fútbol', 'Basketball', 'Tennis'];

        await dropdown.selectOption({ label: 'Tennis' });

        await expect(dropdown, 'It does not have the correct value').toHaveValue('Tennis');``
      });

      await test.step("Validate options from select", async () => {
        const dropdown = page.getByLabel('Dropdown');
        const sports = ['Fútbol', 'Basketball', 'Tennis',];

        for (const sport of sports) {
          const element = await page.$(`select#formBasicSelect > option:is(:text("${sport}"))`);
          if (!element) {
            throw new Error(`The option ${sport} does not exist`);
          } else {
            console.log(`The option ${sport} exists`);
          }
        }

        await dropdown.selectOption({ label: 'Tennis' });

        await expect(dropdown, 'It does not have the correct value').toHaveValue('Tennis');``
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