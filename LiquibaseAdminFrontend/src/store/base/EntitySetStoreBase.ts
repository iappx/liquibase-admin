import { StoreBase } from '@/lib/vue-store'
import { EntitySet } from '@/lib/entityRepo/entitySet/EntitySet'
import { RepoEntityBase } from '@i-app/api-entity-repo'
import { Timer } from '@/lib/time/Timer'
import { EntityQueryBuilder } from '@/lib/entityRepo/entitySet/EntityQueryBuilder'

export class EntitySetStoreBase<T extends Record<string, any>, TEntity extends RepoEntityBase> extends StoreBase<T> {
    public loading = false

    public entities: TEntity[] = []

    private readonly timer: Timer

    constructor(
        protected readonly entitySet: EntitySet<TEntity>,
        private readonly usePaginateMethod = false,
        private readonly updateTime = 10,
        private readonly modifyQuery?: (query: EntityQueryBuilder<TEntity>) => EntityQueryBuilder<TEntity>,
    ) {
        super()
        this.timer = new Timer(updateTime)
    }

    public async getAll(): Promise<TEntity[]> {
        if (this.timer.hasExpired() || this.entities.length > 0) {
            await this.load()
        }
        return this.entities
    }

    public async load(): Promise<void> {
        this.loading = true
        let query = this.entitySet.query().copy()
        if (this.modifyQuery) {
            query = this.modifyQuery(query)
        }
        if (this.usePaginateMethod) {
            this.entities = await query.loadAllFromPaginated()
        } else {
            this.entities = await query.getAll()
        }
        this.timer.reset()
        this.loading = false
    }
}
