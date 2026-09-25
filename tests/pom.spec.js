//import { expect, test } from "@playwright/test"; zamenili smo zbog uvodjenja fixtures
import { LoginPage } from '../pages/loginPage.js';
import { ProductsPage } from "../pages/productsPage.js";
import { expect, test } from "../fixtures/test.js";
import { userSchema } from '../schemas/userSchema.js';
import { UsersApi } from '../api/usersApi.js';

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

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goto()
        await loginPage.loginAsStandardUser()
    })

    test('Standard user login', async ({ page }) => {
        const loginPage = new LoginPage(page)

        // await loginPage.goto()
        // await loginPage.loginAsStandardUser()

        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
        await expect(page.locator('.title')).toHaveText('Products')
    })

    //     test('Standard user login fixture', async ({ loginPage }) => {

    //     await loginPage.goto()
    //     await loginPage.loginAsStandardUser()

    //     await expect(loginPage.page).toHaveURL('https://www.saucedemo.com/inventory.html')
    //     await expect(loginPage.page.locator('.title')).toHaveText('Products')
    // })





    test('User can logout', async ({ page }) => {
        const loginPage = new LoginPage(page)
        const productPage = new ProductsPage(page)

        // await loginPage.goto()
        // await loginPage.loginAsStandardUser()

        await expect(productPage.title).toHaveText('Products')

        await productPage.logout()

        await expect(page).toHaveURL('https://www.saucedemo.com/')
    })





    test('User is redirected to products page after login', async ({ page }) => {
        const loginPage = new LoginPage(page)

        // await loginPage.goto()
        // await loginPage.loginAsStandardUser()

        const currentUrl = loginPage.getCurrentUrl()

        console.log(currentUrl)

        expect(currentUrl).toBe('https://www.saucedemo.com/inventory.html')
    })

    test('Standard user login fixture', async ({ loginPage }) => {

        // await loginPage.goto()
        // await loginPage.loginAsStandardUser()

        await expect(loginPage.page).toHaveURL('https://www.saucedemo.com/inventory.html')
        await expect(loginPage.page.locator('.title')).toHaveText('Products')
    })



    test('User can logout fixture', async ({ loginPage, page }) => {
        const productPage = new ProductsPage(page)

        // await loginPage.goto()
        // await loginPage.loginAsStandardUser()

        await expect(productPage.title).toHaveText('Products')

        await productPage.logout()

        await expect(page).toHaveURL('https://www.saucedemo.com/')
    })

    test('User can logout fixtures 2', async ({ loginPage, productPage }) => {
        // await loginPage.goto()
        // await loginPage.loginAsStandardUser()

        await expect(productPage.title).toHaveText('Products')

        await productPage.logout()

        await expect(productPage.page).toHaveURL('https://www.saucedemo.com/')
    })

})

test.describe('Login tests', () => {

    test('Locked out user cant login', async ({ page }) => {
        const loginPage = new LoginPage(page)

        await loginPage.goto()
        await loginPage.loginAsLockedOutUser()


        await expect(loginPage.errorMessage).toBeVisible()
        await expect(loginPage.errorMessage).toContainText('Epic sadface: Sorry, this user has been locked out.')
        await expect(page).not.toHaveURL('https://www.saucedemo.com/inventory.html')
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

    for (const user of users) {
        test(`Login with ${user.username} fixture`, async ({ loginPage }) => {

            await loginPage.goto()
            await loginPage.login(
                user.username,
                user.password
            )

            await expect(loginPage.page).toHaveURL('https://www.saucedemo.com/inventory.html')
        })
    }

    test('Page has correct title', async ({ page }) => {
        const loginPage = new LoginPage(page)

        await loginPage.goto()

        const title = await loginPage.getPageTitle()

        console.log(title)

        expect(title).toBe('Swag Labs')
    })

    test('Locked out user cant login fixture', async ({ loginPage }) => {
        await loginPage.goto()
        await loginPage.loginAsLockedOutUser()

        await expect(loginPage.errorMessage).toBeVisible()
        await expect(loginPage.errorMessage).toContainText('Epic sadface: Sorry, this user has been locked out.')

        await expect(loginPage.page).not.toHaveURL('https://www.saucedemo.com/inventory.html')
    })

    test('User cannot login wth the wrong password', async ({ page }) => {
        const loginPage = new LoginPage(page)

        await loginPage.goto()
        await loginPage.login('standard_user', 'wrong_password')

        await expect(loginPage.errorMessage).toBeVisible()
        await expect(loginPage.errorMessage).toContainText('Username and password do not match')
    })

    test('Get user', async ({ usersApi}) => {

        const response = await usersApi.getUser(2)

       // expect(response.status()).toBe(200)

        const responseBody = await response.json()

        //expect(responseBody.data.id).toBe(2)
    })

    test('Get non existing user', async ({ usersApi}) => {
        const response = await usersApi.getUser(99999)

        //expect(response.status()).toBe(404)

        const body = await response.json()

        //expect(body).toHaveProperty('error')
    })

    test('Cannot create user with invlaid data', async ({ usersApi}) => {

        const response = await usersApi.createUser({})

        //expect(response.status()).toBe(400)
    })


    test('Create and get user', async ({ usersApi }) => {

        const createResponse = await usersApi.createUser({
            name: 'Marko',
            job: 'QA Engineer'
        })

        //expect(createResponse.status()).toBe(201)

        const createBody = await createResponse.json()

        const userId = createBody.id 

        const getResponse = await usersApi.getUser(userId)

        //expect(getResponse.status()).toBe(200)

        const getBody = await getResponse.json()

       // expect(getBody.data.id).toBe(userId)
    })

    test('Get user schema validation', async ({ usersApi }) => {
        console.log(process.env.REQRES_API_KEY)
        const response = await usersApi.getUser(2)

        expect(response.status()).toBe(200)

        const responseBody = await response.json()

        userSchema.parse(responseBody)
    })


})



