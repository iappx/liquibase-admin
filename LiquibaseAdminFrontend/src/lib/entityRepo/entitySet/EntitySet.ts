import { DefaultEntitySet, IRepository, RepoEntityBase } from '@i-app/api-entity-repo'
import { RepoEntityStatic } from '@i-app/api-entity-repo/lib/entity'
import { RouteParamsRequestConfig } from '@/lib/entityRepo/models/RouteParamsRequestConfig'
import { EntityQueryBuilder } from '@/lib/entityRepo/entitySet/EntityQueryBuilder'

export class EntitySet<T extends RepoEntityBase, TGetParams extends {} = never, TRouteParams extends {} = never> extends DefaultEntitySet<T, RouteParamsRequestConfig> {
    constructor(entityConstructor: RepoEntityStatic<T>, repository: IRepository<T>) {
        super(entityConstructor, repository)
    }

    public query(): EntityQueryBuilder<T, TGetParams, TRouteParams> {
        return new EntityQueryBuilder<T, TGetParams, TRouteParams>(this)
    }
}