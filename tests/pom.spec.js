import { expect, test } from "@playwright/test";
import { LoginPage } from '../pages/loginPage.js';
import { ProductsPage } from "../pages/productsPage.js";

const users = [
    {
        username: 'standard_user',
        password: 'secret_sauce'
    },
    {
        username: 'problem_user',
        password: 'secret_sauce'
    },
    {
        username: 'performance_glitch_user',
        password: 'secret_sauce'
    }
]


test.describe('Login POM tests', () => {
    test('Standard user login', async ({ page }) => {
        const loginPage = new LoginPage(page)

        await loginPage.goto()
        await loginPage.loginAsStandardUser()

        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
        await expect(page.locator('.title')).toHaveText('Products')
    })

    test('Locked out user cant login', async ({ page }) => {
        const loginPage = new LoginPage(page)

        await loginPage.goto()
        await loginPage.loginAsLockedOutUser()


        await expect(loginPage.errorMessage).toBeVisible()
        await expect(loginPage.errorMessage).toContainText('Epic sadface: Sorry, this user has been locked out.')
        await expect(page).not.toHaveURL('https://www.saucedemo.com/inventory.html')
    })

    test('User cannot login wth the wrong password', async ({ page }) => {
        const loginPage = new LoginPage(page)

        await loginPage.goto()
        await loginPage.login('standard_user', 'wrong_password')

        await expect(loginPage.errorMessage).toBeVisible()
        await expect(loginPage.errorMessage).toContainText('Username and password do not match')
    })

    test('User can logout', async ({ page }) => {
        const loginPage = new LoginPage(page)
        const productPage = new ProductsPage(page)

        await loginPage.goto()
        await loginPage.loginAsStandardUser()

        await expect(productPage.title).toHaveText('Products')

        await productPage.logout()

        await expect(page).toHaveURL('https://www.saucedemo.com/')
    })

    for (const user of users) {

        test(`Login with ${user.username}`, async ({ page }) => {

            const loginPage = new LoginPage(page)

            await loginPage.goto()
            await loginPage.login(
                user.username,
                user.password
            )

            await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')

        })
    }

    test('Page has correct title', async ({page}) => {
        const loginPage = new LoginPage(page)

        await loginPage.goto()

        const title = await loginPage.getPageTitle()

        console.log(title)

        expect(title).toBe('Swag Labs')
    })

    test('User is redirected to products page after login', async ({page}) => {
        const loginPage = new LoginPage(page)

        await loginPage.goto()
        await loginPage.loginAsStandardUser()

        const currentUrl = loginPage.getCurrentUrl()

        console.log(currentUrl)

        expect(currentUrl).toBe('https://www.saucedemo.com/inventory.html')
    })
})



