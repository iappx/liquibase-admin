import { RepoEntityBase, RepoEntityField } from '@i-app/api-entity-repo'

export class ChangelogChangeSet extends RepoEntityBase<ChangelogChangeSet> {
    @RepoEntityField({ isPrimaryKey: true })
    id: string

    @RepoEntityField()
    author: string

    @RepoEntityField()
    changes: Record<string, any>

    @RepoEntityField()
    rollback: Record<string, any>

    @RepoEntityField()
    preConditions: Record<string, any>
}
