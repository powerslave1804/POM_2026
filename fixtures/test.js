import { test as base } from '@playwright/test'
import { LoginPage } from '../pages/loginPage.js'
import { ProductsPage } from '../pages/productsPage.js'
import { UsersApi } from '../api/usersApi.js'
import { request } from 'node:http'


export const test = base.extend({
    loginPage: async ({ page}, use) => {
        const loginPage = new LoginPage(page)

        await use(loginPage)
    },

    productPage: async ({page}, use) => {
        const productPage = new ProductsPage(page)

        await use(productPage)
    },

    usersApi: async ({ request}, use) => {
        const usersApi = new UsersApi(request)

        await use(usersApi)
    }
})









export { expect } from '@playwright/test'

// myFixture: async ({ dependency }, use) => {

//     // setup

//     await use(resource);

//     // teardown
// }