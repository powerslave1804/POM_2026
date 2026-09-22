import { BasePage } from "./basePage"

class CheckoutPage extends BasePage {

    constructor(page) {
        //this.page = page
        super(page)

        this.firstname = page.getByPlaceholder('First Name')
        this.lastname = page.getByPlaceholder('Last Name')
        this.postalCode = page.getByPlaceholder('Zip/Postal Code')

        this.continueButton = page.getByRole('button', { name: 'Continue'})

        this.finishbutton = page.getByRole('button', { name: 'Finish'})

        this.completeMessage = page.locator('.complete-header')
    }

    async fillCheckoutForm(FirstNameText, LastNameText, postalCodeText){
        await this.firstname.fill(FirstNameText)
        await this.lastname.fill(LastNameText)
        await this.postalCode.fill(postalCodeText)
    }

    async continue(){
        await this.continueButton.click()
    }

    async finish(){
        await this.finishbutton.click()
    }
}

export { CheckoutPage }