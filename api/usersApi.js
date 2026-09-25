
class UsersApi {

    constructor(request) {
        this.request = request
    }

    async getUser(id) {
        return await this.request.get(`/api/users/${id}`)
    }

    async createUser(data) {
        return await this.request.post(`/api/users`, 
            {
                data
            }
        )
    }
}

export { UsersApi }