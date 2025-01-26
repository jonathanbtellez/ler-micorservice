import { BadRequest } from "../exception/bad_request.js"
import { NotFound } from "../exception/not_found.js"
import { fromUserRequest } from "../model/mapper.js"
import { findAll, findByEmail, findByEmailLike, findById, remove, save, update } from "../repository/user.js"

export const getUsersService = async () => {
    return await findAll()
}

export const postUserService = async (user) => {
    const usersByEmail = await findByEmail(user.email)
    if (usersByEmail.length > 0) {
        throw new BadRequest(`${user.email} already in use`)
    }
    return await save(fromUserRequest(user))
}

export const putUserService = async (id, user) => {
    await getByIdOrThrow(id)
    return await update(id, fromUserRequest(user))
}

export const getByIdService = async (id) => {
    return await getByIdOrThrow(id)
}

const getByIdOrThrow = async (id) => {
    try {
        const user = await findById(id)
        if (!user) {
            throw new Error('User not found')
        }
        return user
    } catch (err) {
        throw new NotFound(err.message)
    }
}

export const removeService = async (id) => {
    await getByIdOrThrow(id)
    return await remove(id)
}

export const findByEmailLikeService = async (email) => {
    return await findByEmailLike(email)
}