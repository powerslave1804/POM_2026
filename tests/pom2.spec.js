import { expect, test } from "@playwright/test";
import { LoginPage } from '../pages/loginPage.js';
import { ProductsPage } from "../pages/productsPage.js";
import { LOADIPHLPAPI } from "node:dns";



    test.describe('Products POM tests', () => {
        test('User can add product to cart', async({page}) => {
            const loginPage = new LoginPage(page)
            const productPage = new ProductsPage(page)

            await loginPage.goto()
            await loginPage.loginAsStandardUser()

            await productPage.addProductToCart()

            const title = await productPage.getPageTitle()
            console.log(title)

            await expect(productPage.shoppingCart).toContainText('1')
        })

        test('Products page has correct URL', async ({page}) => {
            const loginPage = new LoginPage(page)
            const productPage = new ProductsPage(page)

            await loginPage.goto()
            await loginPage.loginAsStandardUser()

            const currentUrl = productPage.getCurrentUrl()

            expect(currentUrl).toBe('https://www.saucedemo.com/inventory.html')
        })
    })

