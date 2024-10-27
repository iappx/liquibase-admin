import {
    NavigationGuardNext,
    RouteLocationNormalized,
    RouteLocationNormalizedLoaded,
    RouteLocationRaw,
} from 'vue-router'
import { ComponentPublicInstance } from 'vue'

// eslint-disable-next-line no-unused-vars
type NavigationGuardNextCallback = (vm: ComponentPublicInstance) => unknown;
export type NavigationGuardReturn = void | Error | RouteLocationRaw | boolean | NavigationGuardNextCallback;

export abstract class RouteBase {
    path: string

    // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
    public async beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalizedLoaded, next: NavigationGuardNext): Promise<NavigationGuardReturn> {
        await next()
    }
}
