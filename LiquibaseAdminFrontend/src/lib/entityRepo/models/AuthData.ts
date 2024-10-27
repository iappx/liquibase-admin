export class AuthData {
    private _accessToken: string
    private _refreshToken: string

    get bearerToken(): string {
        return 'Bearer ' + this._accessToken
    }

    get refreshToken(): string {
        return this._refreshToken
    }

    set(access: string, refresh: string): void {
        this._accessToken = access
        this._refreshToken = refresh
    }

    clear(): void {
        this._accessToken = ''
        this._refreshToken = ''
    }

    empty(): boolean {
        return !this._accessToken && !this._refreshToken
    }
}
