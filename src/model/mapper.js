import User from "./user.js"

export const fromUserRequest = (user) => {
    return new User(null, user.name, user.email, user.age)
}