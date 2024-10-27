import { FunctionalComponent, h, ref } from 'vue'
import { AntdIconProps } from '@ant-design/icons-vue/lib/components/AntdIcon'
import { RouteInfo } from '@/lib/router/models/RouteInfo'
import { plainToInstance } from 'class-transformer'

export class MenuItem {
    title: string
    label: string
    key?: string
    children: MenuItem[]
    path: string
    icon?: FunctionalComponent<AntdIconProps>
    noLink: boolean
    order?: number

    get menuChildren(): MenuItem[] {
        return this.children.filter(p => !p.noLink)
    }

    public static createFromRoute(route: RouteInfo): MenuItem {
        let children: MenuItem[] = []
        if (route.children) {
            for (let i = 0; i < route.children.length; i++) {
                const child = route.children[i]
                if (!child.meta?.includeToMenu) {
                    continue
                }
                const item = MenuItem.createFromRoute(child)
                children.push(item)
            }
            children = children.sort((a: MenuItem, b: MenuItem) => (a.order || 0) - (b.order || 0))
        }
        const menuItem = plainToInstance(MenuItem, {
            title: ref(route.meta?.title),
            key: route.name,
            order: route.meta?.menuOrder,
            children: children.length > 0 ? children : undefined,
            path: route.fullPath,
            icon: route.meta?.icon ? () => h(route.meta?.icon as any) : undefined,
            noLink: false,
            label: ref(route.meta?.title),
        })
        menuItem.title = route.meta.title || ''
        menuItem.label = route.meta.title || ''
        return menuItem
    }
}
