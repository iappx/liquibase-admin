import { AxiosRequestConfig } from 'axios'

export type RouteParamsRequestConfig = AxiosRequestConfig & {
    routeParams?: Record<string, any>
}