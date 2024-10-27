import { NavigationGuardWithThis, RouteRecordRaw } from 'vue-router'
import { RouteMetaData } from '@/lib/router/types/RouteMetaData'
import { StorageBase } from '@/lib/storage/base/StorageBase'
import { RouteInfo } from '@/lib/router/models/RouteInfo'
import { TypeInfo } from '@/lib/extendedTypes/TypeInfo'
import { AppEnvironment } from '@/config/AppEnvironment'

export class RouteStorage extends StorageBase<RouteInfo> {
    public static readonly instance = new RouteStorage()

    private routesLoaded = false

    private routeTree: RouteInfo[] = []

    private static createRouteRecord(routeInfo: RouteInfo): RouteRecordRaw {
        return {
            path: routeInfo.path,
            component: routeInfo.component,
            name: TypeInfo.create(routeInfo.module).getTypeId(),
            redirect: routeInfo.redirect || undefined,
            beforeEnter: (routeInfo.moduleInstance.beforeEnter || undefined) as NavigationGuardWithThis<undefined>,
            meta: routeInfo.meta,
            children: routeInfo.children ? routeInfo.children.map(p => this.createRouteRecord(p)) : [],
        }
    }

    private static createTree(nodes: RouteInfo[]): RouteInfo[] {
        const map: Record<string, number> = {}
        let node: RouteInfo
        const roots: RouteInfo[] = []

        for (let i = 0; i < nodes.length; i++) {
            map[TypeInfo.create(nodes[i].module).getTypeId()] = i
            nodes[i].children = []
        }

        for (let i = 0; i < nodes.length; i++) {
            node = nodes[i]
            if (node.parent) {
                const parent = nodes[map[TypeInfo.create(node.parent).getTypeId()]]
                if (parent) {
                    node.parentInfo = parent
                    parent.children.push(node)
                } else {
                    roots.push(node)
                }
            } else {
                roots.push(node)
            }
        }
        return roots
    }

    private static processPaths(routeInfo: RouteInfo, basePath = ''): void {
        if (basePath.endsWith('/')) {
            basePath = basePath.slice(basePath.length - 2)
        }
        let currentPath
        if (routeInfo.path.startsWith('/')) {
            currentPath = basePath + routeInfo.path
        } else {
            currentPath = basePath + '/' + routeInfo.path
        }
        routeInfo.fullPath = currentPath
        if (routeInfo.children) {
            for (let i = 0; i < routeInfo.children.length; i++) {
                const child = routeInfo.children[i]
                this.processPaths(child, currentPath)
            }
        }
    }

    public addMeta<TKey extends keyof RouteMetaData>(key: string, metKey: TKey, value: RouteMetaData[TKey]): void {
        const item = this.addOrUpdate(key, {})
        if (!item.meta) {
            item.meta = {}
        }
        item.meta[metKey] = value
    }

    public getRoutes(): RouteRecordRaw[] {
        this.loadRoutes()
        return this.routeTree.map(p => RouteStorage.createRouteRecord(p))
    }

    public getRouteTree(): RouteInfo[] {
        this.loadRoutes()
        return this.routeTree
    }

    private loadRoutes(): void {
        if (!this.routesLoaded) {
            let array = this.getAsArray().map(p => {
                p.moduleInstance = new p.module()
                return p
            })
            if (!AppEnvironment.Dev) {
                array = array.filter(p => !p.dev)
            }
            this.routeTree = RouteStorage.createTree(array)
            for (let i = 0; i < this.routeTree.length; i++) {
                RouteStorage.processPaths(this.routeTree[i])
            }
            this.routesLoaded = true
        }
    }
}
