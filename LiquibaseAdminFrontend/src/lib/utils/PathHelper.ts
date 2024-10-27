export class PathHelper {
    public static resolvePath(path: string | string[], obj: Record<string, any> | any, separator = '.'): string {
        const properties = Array.isArray(path) ? path : path.split(separator)
        return properties.reduce((prev, curr) => prev && prev[curr], obj).toString()
    }

    public static setValue(path: string | string[], obj: Record<string, any>, value: any, separator = '.'): void {
        const properties = Array.isArray(path) ? path : path.split(separator)
        let result = obj
        for (let i = 0; i < properties.length - 1; i++) {
            const property = properties[i]
            if (!result[property]) {
                result[property] = {}
            }
            result = result[property]
        }
        const lastProperty = properties[properties.length - 1]
        result[lastProperty] = value
    }
}
