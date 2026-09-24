import { test as base } from '@playwright/test'
import { LoginPage } from '../pages/loginPage.js'
import { ProductsPage } from '../pages/productsPage.js'


export const test = base.extend({
    loginPage: async ({ page}, use) => {
        const loginPage = new LoginPage(page)

        await use(loginPage)
    },

    productPage: async ({page}, use) => {
        const productPage = new ProductsPage(page)

        await use(productPage)
    }
})









export { expect } from '@playwright/test'

// myFixture: async ({ dependency }, use) => {

//     // setup

//     await use(resource);

//     // teardown
// }