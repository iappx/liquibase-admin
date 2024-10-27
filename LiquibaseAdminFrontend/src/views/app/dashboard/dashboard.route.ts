import { MenuIncluded, RouteIcon, RoutePage, RouteTitle } from '@/lib/router/decorators/RouterDecorators'
import { AppRoute } from '@/views/app/app.route'
import { HomeOutlined } from '@ant-design/icons-vue'
import { RouteBase } from '@/lib/router/base/RouteBase'

@RoutePage(() => import('./index.vue'), 'dashboard', () => AppRoute)
@MenuIncluded(1)
@RouteTitle('Migrations')
@RouteIcon(HomeOutlined)
export class DashboardRoute extends RouteBase {
}
