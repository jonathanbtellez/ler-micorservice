import { ensureIfIsNumberBetweenRange } from "../valueObject/number.js";
import { ensureIfIsString, ensureIfIsValidEmail } from "../valueObject/string.js";

export class UserRequest {
    constructor(name, email, age) {
        if (!name || !email || !age) {
            throw new Error('Name, email and age are required')
        }

        ensureIfIsString(name, 'name')
        ensureIfIsValidEmail(email)
        ensureIfIsNumberBetweenRange(age, 'age', 0, 150)
        
        this.name = name;
        this.email = email;
        this.age = age;
    }
}