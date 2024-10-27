import { randomBytes } from 'crypto'

export class RandomUtilities {
    static getRandomString(length: number): string {
        return randomBytes(length / 2).toString('hex')
    }
}