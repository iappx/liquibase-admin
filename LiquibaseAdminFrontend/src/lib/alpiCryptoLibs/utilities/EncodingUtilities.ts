import * as CryptoJS from 'crypto-js'

type CryptoJsWordArray = {}

type CryptoJsEnc = {
    parse(data: string): CryptoJsWordArray,
    stringify(arr: CryptoJsWordArray): string
}

const CryptoJsEncArray: Record<string, CryptoJsEnc> = CryptoJS.enc

const { Hex, Base64, Utf8 } = CryptoJsEncArray

export class EncodingUtilities {
    static Hex = Hex
    static Base64 = Base64
    static Utf8 = Utf8

    static stringToBase64(data: string): string {
        const wordArray = Utf8.parse(data)
        return Base64.stringify(wordArray)
    }

    static base64ToString(data: string): string {
        const wordArray = Base64.parse(data)
        return Utf8.stringify(wordArray)
    }
}