import { response } from "express"
import { getUsersService } from "../service/users.js"
import { error, info } from "../utils/logger.js"

export const getUsers = async (req, res = response) => {
    try {
        info('Fetching users from database')
        const users = await getUsersService()
        info('Users fetched successfully')
        res.status(200).json({
            status: 'success',
            data: users
        })
    } catch (err) {
        error('Error fetching users from database: ', err.message)
        res.status(500).json({ status: 'error', error: err.message })
    }
}