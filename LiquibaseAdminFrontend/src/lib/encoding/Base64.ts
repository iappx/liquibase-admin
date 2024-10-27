import { enc } from 'crypto-js'

export class Base64 {
    public static b64ToString(data: string): string {
        const bytes = enc.Base64.parse(data)
        return bytes.toString(enc.Utf8)
    }

    public static stringToB64(data: string): string {
        const bytes = enc.Utf8.parse(data)
        return bytes.toString(enc.Base64)
    }
}