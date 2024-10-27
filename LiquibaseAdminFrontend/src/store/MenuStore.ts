import { MenuItem } from '@/models/menu/MenuItem'
import { RouteStorage } from '@/lib/router/RouteStorage'
import { RouteInfo } from '@/lib/router/models/RouteInfo'
import { InjectableStore, StoreBase } from '@/lib/vue-store'


@InjectableStore('MenuStore')
export class MenuStore extends StoreBase<MenuStore> {

    menuItems: MenuItem[] = []

    openedMenu = ''
    selectedMenu = ''

    collapsed = false

    public setSelectedSidebar(val: string): void {
        this.selectedMenu = val
    }

    public setOpenedMenu(val?: string): void {
        this.openedMenu = val ?? ''
    }

    public loadMenu(): void {
        this.menuItems = []
        const routeTree = RouteStorage.instance.getRouteTree()
        for (let i = 0; i < routeTree.length; i++) {
            const route = routeTree[i]
            if (route.path == '/app') {
                const items = route.children.map(p => this.getMenuItem(p)).filter(p => !!p) as MenuItem[]
                this.menuItems.push(...items)
            }
        }
        this.menuItems = this.menuItems.sort((a, b) => (a.order || 0) - (b.order || 0))
    }

    setup(): void {
        this.loadMenu()
    }

    public collapsedTrigger(): void {
        this.collapsed = !this.collapsed
    }

    private getMenuItem(route: RouteInfo): MenuItem | null {
        if (!route.meta || !route.meta.includeToMenu) {
            return null
        }
        return MenuItem.createFromRoute(route)
    }
}
