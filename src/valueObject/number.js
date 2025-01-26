import { BadRequest } from "../exception/bad_request.js"

export const ensureIfIsNumberBetweenRange = (value, field, min, max) => {
    ensureIfIsNumber(value, field)
    if (value < min || value > max) {
        throw new BadRequest(`${field} must be between ${min} and ${max}`)
    }
}

export const ensureIfIsNumber = (value, field) => {
    const regex = /^\d+$/;
    if (typeof value === 'string') {
        if (!regex.test(value)) {
            throw new BadRequest(`${field} must be a valid number`);
        }
    } else if (typeof value !== 'number' || isNaN(value)) {
        console.log("afsdf")
        throw new BadRequest(`${field} must be a valid number`);
    }
}