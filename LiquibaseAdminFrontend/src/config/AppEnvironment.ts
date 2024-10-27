export class AppEnvironment {
    public static readonly AppApi: string = (import.meta as any).env.VITE_APP_API
    public static readonly Dev = (import.meta as any).env.MODE == 'development'
}
