import { RepoEntityBase, RepoEntityField } from '@i-app/api-entity-repo'

export class DatabaseChangeLog extends RepoEntityBase<DatabaseChangeLog> {
    @RepoEntityField({ isPrimaryKey: true })
    id: string

    @RepoEntityField()
    author: string

    @RepoEntityField()
    fileName: string

    @RepoEntityField()
    dateExecuted: string

    @RepoEntityField()
    orderExecuted: number

    @RepoEntityField()
    executionType: string

    @RepoEntityField()
    description: string

    get executed(): boolean {
        return this.executionType == 'EXECUTED'
    }

    get markRan(): boolean {
        return this.executionType == 'MARK_RAN'
    }
}
