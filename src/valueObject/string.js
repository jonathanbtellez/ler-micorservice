import { BadRequest } from "../exception/bad_request.js";

export const ensureIfIsString = (value, field) => {
    if (typeof value !== 'string') {
        throw new BadRequest(`${field} must be a string`)
    }
}

export const ensureIfIsValidEmail = (value) => {
    ensureIfIsString(value, 'email')

    const localPart = "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*";
    const domainPart = "(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?";
    const emailRegex = new RegExp(`^${localPart}@${domainPart}$`);
    if(!emailRegex.test(value)) {
        throw new BadRequest('The email is invalid')
    }
}