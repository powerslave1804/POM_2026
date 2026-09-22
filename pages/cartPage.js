import { BasePage } from "./basePage"

class CartPage extends BasePage {
    constructor(page) {
        //this.page = page
        super(page)
        this.cartItems = page.locator('.cart_item')
        this.checkoutButton = page.getByRole('button', { name: 'Checkout' })
        this.removeButton = page.getByRole('button', { name: /Remove/ })
    }

    async removeProduct() {
        await this.removeButton.first().click()
    }

    async checkout() {
        await this.checkoutButton.click()
    }
}

export { CartPage }