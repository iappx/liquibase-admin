import { createRouter, createWebHashHistory, Router } from 'vue-router'
import { RouteStorage } from '@/lib/router/RouteStorage'

export async function createComponentRouter(): Promise<Router> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const modulePaths: Record<string, () => () => Promise<void>> = await import.meta.glob('./views/**/*route.ts')
    const importFunctions = Object.values(modulePaths).map(p => p())
    await Promise.all(importFunctions)
    const routes = RouteStorage.instance.getRoutes()

    routes.push({
        path: '/:catchAll(.*)',
        component: () => import('@/views/Error.vue'),
    })

    return createRouter({
        history: createWebHashHistory(),
        routes: routes,
    })
}
