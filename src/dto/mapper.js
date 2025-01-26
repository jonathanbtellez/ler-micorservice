import { UserResponse } from "./user_response.js"

export const fromUser = (user) => {
    return new UserResponse(user.id, user.name, user.email, user.age)
}

export const fromUserList = (users) => {
    return users.map(user => fromUser(user))
}