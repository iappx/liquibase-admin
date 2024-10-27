import { StoreBase } from '@/lib/vue-store/base/StoreBase'

export abstract class LoadableItemStoreBase<T extends object> extends StoreBase<T> {
    public static readonly UpdateTime = 1000

    public items: T[] = []

    public storeLoaded = false
    public storeLoading = false
    protected nextUpdate: number

    protected abstract loadItems(): Promise<T[]>

    public async loadIfNeeded(): Promise<void> {
        if (!this.storeLoaded && !this.storeLoading || this.nextUpdate > new Date().getTime()) {
            this.storeLoading = true
            this.items = await this.loadItems()
            this.nextUpdate = new Date().getTime() + LoadableItemStoreBase.UpdateTime
            this.storeLoading = false
            this.storeLoaded = true
        }
    }

    public clear(): void {
        this.items = []
        this.storeLoaded = false
        this.storeLoading = false
        this.nextUpdate = 0
    }
}