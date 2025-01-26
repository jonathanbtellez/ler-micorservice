import { response } from "express"
import { getUsersService, postUserService, putUserService, getByIdService, removeService, findByEmailLikeService } from "../service/users.js"
import { error, info } from "../utils/logger.js"
import { UserRequest } from "../dto/user_request.js"
import { fromUser, fromUserList } from "../dto/mapper.js"
import { ensureIfIsNumber } from "../valueObject/number.js"
import { ensureIfIsString } from "../valueObject/string.js"

export const getUsers = async (_, res = response) => {
    try {
        info('Fetching users from database')
        const users = fromUserList(await getUsersService())
        info('Users fetched successfully')
        res.status(200).json({
            status: 'success',
            data: users
        })
    } catch (err) {
        error('Error fetching users from database: ', err.message)
        res.status(err.status).json({ status: 'error', error: err.message })
    }
}


export const postUser = async (req, res = response) => {
    try {
        info('Creating new user...')
        const { name, email, age } = req.body
        const userRequest = new UserRequest(name, email, age)

        await postUserService(userRequest)

        info('User created successfully')
        res.status(201).json({
            status: 'success',
            message: 'User created successfully'
        })
    } catch (err) {
        error('Error creating user: ', err)
        res.status(err.status).json({ status: 'error', error: err.message })
    }
}


export const putUser = async (req, res = response) => {
    try {
        info('Updating user...')
        const { id } = req.params
        console.log(id)
        ensureIfIsNumber(id, "id")
        const { name, email, age } = req.body
        const userRequest = new UserRequest(name, email, age)

        const userResponse = fromUser(await putUserService(id, userRequest))

        info('User updated successfully')
        res.status(200).json({
            status: 'success',
            data: userResponse
        })
    } catch (err) {
        error('Error updating user: ', err.message)
        res.status(err.status).json({ status: 'error', error: err.message })
    }
}


export const getByEmail = async (req, res = response) => {
    try {
        let { email } = req.params
        email = email ?? ""
        info('Fetching users with email: ', email)
        ensureIfIsString(email, "email")
        const list = fromUserList(await findByEmailLikeService(email))
        info('User fetching succesfully')
        res.status(200).json({
            status: "success",
            data: list
        })
    } catch (err) {
        error('Error getting message: ', err.message)
        res.status(err.status).json({
            status: "error",
            error: err.message
        })
    }
}

export const getById = async (req, res = response) => {
    try {
        const { id } = req.params
        info('Fetching user with id: ', id)
        ensureIfIsNumber(id, "id")
        const userResponse = fromUser(await getByIdService(id))
        info('User fetching succesfully')
        res.status(200).json({
            status: "success",
            data: userResponse
        })
    } catch (err) {
        error('Error getting message: ', err.message)
        res.status(err.status).json({
            status: "error",
            error: err.message
        })
    }
}

export const destroy = async (req, res = response) => {
    try {
        const { id } = req.params
        info('Deleting user with id: ', id)
        ensureIfIsNumber(id, "id")
        await removeService(id)
        info('User deleted successfully')
        res.status(200).json({
            status: 'success',
            message: 'User deleted successfully'
        })

    } catch (err) {
        error('Error deleting user: ', err.message)
        res.status(err.status).json({ status: 'error', error: err.message })
    }
}