class BasePage {
    
    constructor(page){
        this.page = page
    }

    async goto(url){
        await this.page.goto(url)
    }

    async getPageTitle(){
        return await this.page.title()
    }

     getCurrentUrl() {
        return this.page.url()
    }
}

export { BasePage}