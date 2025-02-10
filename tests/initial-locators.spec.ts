import { test, expect } from '@playwright/test';

test.describe('Navegation en www.freerangetesters.com', () => {
  const sections = [
    { name: 'Cursos', url: '/cursos', titleExpected: 'Cursos' },
    // { name: 'Udemy', url: '/udemy', titleExpected: 'Udemy' },
    // { name: 'Recursos', url: '/recursos', titleExpected: 'Recursos' },
  ];

  for (const section of sections) {
    test(`Val'idation for redirecting to the section ${section.name}`, async ({ page }) => {
      await test.step('Go to the principal page', async () => {
        await page.goto('https://www.freerangetesters.com/');
        await expect(page).toHaveTitle('Free Range Testers');

      });

      await test.step(`When it does click to "${section.name}"`, async () => {
        await page.locator('#page_header').getByRole('link', { name: section.name, exact: true }).click();
        await page.waitForURL(`**${section.url}`);
      });

      await test.step(`Click on the link "${section.titleExpected}"`, async () => {
        await expect(page).toHaveTitle(section.titleExpected)


        // Locators


        // Best locator, better used it, it is focused on testing  
        // <<data-testid="AnyTestId">> on the element
        const testId = page.getByTestId('AnyTestId');

        // By rol, exact to say exact as it is written, most recommended
        const button = page.getByRole('link', { name: 'Cursos', exact: true });

        // Not recommended because text could change
        const text = page.getByText('No esperes más...')

        // General found it in forms
        const label = page.getByLabel('Any label')
        const placeholder = page.getByPlaceholder('Any placeholder')

        // Alternattive text in images to get
        const alt = page.getByAltText('Any alt from image')

        // Get by title
        const title = page.getByTitle('Any title');

        // Locator in CSS and XPATH (not recommended)
        const css = page.locator('xpath=bottonLoco');

        // If we have a list of buttons for instance, we can get any index of the button like that
        //  We want to select the second button of the list 
        // <ul>
        //     <li>
        //         <h3>Play</h3>
        //         <button>Add to cart</button>
        //     </li>
        //     <li>
        //         <h3>Xbox</h3>
        //         <button>Add to cart</button>
        //     </li>
        // </ul>
        const buttonBuy = page.getByRole('listitem')
          .filter({hasText: 'Xbox'})
          .getByRole('button', {name: 'Add to cart'});

        // Other way to get the button
        const buttonBuySecondWay = page.getByRole('listitem')
          .filter({has: page.getByRole('heading', {name: 'Xbox'})})
          .getByRole('button', {name: 'Add to cart'});

        // Get the first button of the list
        const buttonBuyFirst = page.getByRole('listitem').first().getByRole('button', {name: 'Add to cart'});

        // Get exact index if we know it
        const buttonBuyExact = page.getByRole('listitem').nth(1).getByRole('button', {name: 'Add to cart'});

        
          // Case if we try to select an element that is not visible or some not, not the best practice
          // but just in case
          // <button style="display: none;">No lo ves</button>
          // <button>Lo ves</button>
          const buttonNotVisible = page.locator('button').locator('visible=false');
      });
    });
  }
});