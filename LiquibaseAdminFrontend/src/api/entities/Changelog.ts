import { RepoEntityBase, RepoEntityField } from '@i-app/api-entity-repo'
import { DatabaseChangeLog } from '@/api/entities/DatabaseChangeLog'
import { ChangelogChangeSet } from '@/api/entities/ChangelogChangeSet'

export class Changelog extends RepoEntityBase<Changelog> {
    @RepoEntityField()
    logicalFilePath: string

    @RepoEntityField({ nestedType: () => DatabaseChangeLog })
    databaseChangelog: DatabaseChangeLog

    @RepoEntityField({ nestedType: () => ChangelogChangeSet })
    changeSets: ChangelogChangeSet[]

    get id(): string {
        return this.databaseChangelog?.id || this.changeSets[0].id || ''
    }

    get authors(): string[] {
        return [...new Set(this.databaseChangelog?.author ? [this.databaseChangelog?.author] : this.changeSets.map(p => p.author))]
    }

    get executed(): boolean {
        return !!this.databaseChangelog
    }
}
