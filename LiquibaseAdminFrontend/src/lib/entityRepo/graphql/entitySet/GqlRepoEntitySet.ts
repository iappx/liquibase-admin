import { EntityContextBase, RepoEntityBase, RepoEntitySet, RepoEntityStatic } from '@i-app/api-entity-repo'
import { TGqlApiRepositoryParams } from '@/lib/entityRepo/graphql/entitySet/types/TGqlApiRepositoryParams'

export const GqlRepoEntitySet = (entity: () => RepoEntityStatic<RepoEntityBase>, entityName: string, options?: Record<string, any>) =>
    <T extends EntityContextBase>(target: T, propertyKey: string) => {
        RepoEntitySet<TGqlApiRepositoryParams>(entity, {
            entityName,
            ...options,
        })(target, propertyKey)
    }
