import { EntityContextBase, IRepository, RepoEntityBase, RepoEntityStatic } from '@i-app/api-entity-repo'
import { EntitySet } from '@/lib/entityRepo/entitySet/EntitySet'

export abstract class EntitySetContextBase extends EntityContextBase<EntitySet<any>> {
    protected buildEntitySet<T extends RepoEntityBase>(entity: RepoEntityStatic<T>, repository: IRepository<T>): EntitySet<any> {
        return new EntitySet<any>(entity, repository)
    }
}