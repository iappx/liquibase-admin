import { Component } from 'vue'
import { RouteBaseConstructor } from '@/lib/router/types/RouteBaseConstructor'
import { RouteMetaData } from '@/lib/router/types/RouteMetaData'
import { RouteStorage } from '@/lib/router/RouteStorage'
import { TypeInfo } from '@/lib/extendedTypes/TypeInfo'
import { AntDVIcon } from '@/lib/types/AntDVIcon'

export const RoutePage = (component: Component, path: string, parent?: () => RouteBaseConstructor) => (module: RouteBaseConstructor) => {
    const mame = TypeInfo.create(module).getTypeId()
    RouteStorage.instance.addOrUpdate(mame, {
        path,
        parent: parent ? parent() : undefined,
        module,
        component,
        name: mame,
    })
}

export const PropsRoute = () => (module: RouteBaseConstructor) => {
    RouteStorage.instance.addOrUpdate(TypeInfo.create(module).getTypeId(), {
        props: true,
    })
}

export const RouteMeta = (data: RouteMetaData) => (module: RouteBaseConstructor) => {
    RouteStorage.instance.addOrUpdate(TypeInfo.create(module).getTypeId(), {
        meta: data,
    })
}

export const RouteRedirect = (to: string) => (module: RouteBaseConstructor) => {
    RouteStorage.instance.addOrUpdate(TypeInfo.create(module).getTypeId(), {
        redirect: to,
    })
}

export const DevRoute = () => (module: RouteBaseConstructor) => {
    RouteStorage.instance.addOrUpdate(TypeInfo.create(module).getTypeId(), {
        dev: true,
    })
}

export const MenuIncluded = (order?: number) => (module: RouteBaseConstructor) => {
    RouteStorage.instance.addMeta(TypeInfo.create(module).getTypeId(), 'includeToMenu', true)
    RouteStorage.instance.addMeta(TypeInfo.create(module).getTypeId(), 'menuOrder', order)
}

export const RouteTitle = (title: string) => (module: RouteBaseConstructor) => {
    RouteStorage.instance.addMeta(TypeInfo.create(module).getTypeId(), 'title', title)
}

export const RouteIcon = (icon: AntDVIcon) => (module: RouteBaseConstructor) => {
    RouteStorage.instance.addMeta(TypeInfo.create(module).getTypeId(), 'icon', icon)
}

export const AdminRoute = () => (module: RouteBaseConstructor) => {
    RouteStorage.instance.addMeta(TypeInfo.create(module).getTypeId(), 'adminRoute', true)
}
