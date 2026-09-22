import { BasePage } from "./basePage"

class LoginPage extends BasePage {

    constructor(page) {
       // this.page = page //brisemo nakon sto smo uveli BasePage
        super(page)

        this.username = page.getByPlaceholder('Username')
        this.password = page.getByPlaceholder('Password')
        this.loginButton = page.getByRole('button', { name: 'Login' })
        this.errorMessage = page.locator('[data-test="error"]')
    }

    async goto() {
        await super.goto('https://www.saucedemo.com/')
    }

    async login(usernameText, passwordText) {
        await this.username.fill(usernameText)
        await this.password.fill(passwordText)
        await this.loginButton.click()
    }

    async loginAsStandardUser() {
        await this.login('standard_user', 'secret_sauce')
    }

    async loginAsLockedOutUser() {
        await this.login('locked_out_user', 'secret_sauce')
    }
}

export { LoginPage }