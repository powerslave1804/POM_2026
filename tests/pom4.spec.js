import { expect, test } from "@playwright/test";
import { LoginPage } from "../pages/loginPage.js"
import { ProductsPage } from "../pages/productsPage.js";
import { CartPage } from "../pages/cartPage.js";
import { CheckoutPage } from "../pages/checkoutPage.js";


test.describe('Complete purchase', () => {
    test('User can complete purchase', async ({page}) => {
        const loginPage = new LoginPage(page)
        const productPage = new ProductsPage(page)
        const cartPage = new CartPage(page)
        const checkoutPage = new CheckoutPage(page)

        await loginPage.goto()
        await loginPage.loginAsStandardUser()

        await productPage.addProductToCart()
        await productPage.openCart()

        await cartPage.checkout()

        await checkoutPage.fillCheckoutForm('Jedan', 'Dva', 'Tri')
        await checkoutPage.continue()
        await checkoutPage.finish()

        await expect(checkoutPage.completeMessage).toHaveText('Thank you for your order!')
    })
})