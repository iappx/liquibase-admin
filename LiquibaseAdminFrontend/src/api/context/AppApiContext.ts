import { EntitySetContextBase } from '@/lib/entityRepo/context/base/EntitySetContextBase'
import { EntitySet } from '@/lib/entityRepo/entitySet/EntitySet'
import { RestRepoEntitySet } from '@i-app/api-entity-repo'
import { Changelog } from '@/api/entities/Changelog'

export class AppApiContext extends EntitySetContextBase {
    @RestRepoEntitySet(() => Changelog, 'liquibase/db-changelog')
    public readonly changelog: EntitySet<Changelog>
}
