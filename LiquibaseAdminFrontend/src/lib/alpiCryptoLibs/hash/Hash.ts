import * as CryptoJS from 'crypto-js'

export class Hash {
    static SHA1(data: string): string {
        return CryptoJS.SHA1(data).toString(CryptoJS.enc.Base64)
    }

    static SHA384(data: string): string {
        return CryptoJS.SHA384(data).toString()
    }

    static SHA256(data: string): string {
        return CryptoJS.SHA256(data).toString()
    }

    static SHA512(data: string): string {
        return CryptoJS.SHA512(data).toString()
    }
}