export interface ILiquibaseCommand {
    readonly name: string

    getArgs(): Record<string, any>
}
