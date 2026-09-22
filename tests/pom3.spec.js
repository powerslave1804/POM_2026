import { expect, test } from "@playwright/test";
import { LoginPage } from "../pages/loginPage.js";
import { ProductsPage } from "../pages/productsPage.js";
import { CartPage } from "../pages/cartPage.js";


test.describe('Test on Cart page', () => {
    test('User can remove product from cart', async ({ page}) => {
        const loginPage = new LoginPage(page)
        const productsPage = new ProductsPage(page)
        const cartPage = new CartPage(page)

        await loginPage.goto()
        await loginPage.loginAsStandardUser()

        await productsPage.addProductToCart()
        await productsPage.openCart()

        await expect(cartPage.cartItems).toHaveCount(1)

        await cartPage.removeProduct()

        await expect(cartPage.cartItems).toHaveCount(0)
    })
})