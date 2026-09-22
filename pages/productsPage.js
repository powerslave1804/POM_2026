import { BasePage } from "./basePage"

class ProductsPage extends BasePage {
    constructor(page){
        //this.page = page //brisemo nakon uvodjenja BasePage
        super(page)

        this.title = page.locator('.title')
        this.shoppingCart = page.locator('.shopping_cart_link')

        this.backpackAddButton = page.getByRole('button', { name: 'Add to cart', exact: true}).first()

        this.menuButton = page.locator('#react-burger-menu-btn')

        this.logoutButton = page.locator('#logout_sidebar_link')
    }

    async addProductToCart(){
        await this.backpackAddButton.click()
    }

    async openCart() {
        await this.shoppingCart.click()
    }

    async logout() {
        await this.menuButton.click()
        await this.logoutButton.click()
    }
}

export { ProductsPage }