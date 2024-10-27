import { FunctionalComponent } from 'vue'
import { AntdIconProps } from '@ant-design/icons-vue/lib/components/AntdIcon'

export type RouteMetaData = {
    title?: string
    icon?: FunctionalComponent<AntdIconProps>
    includeToMenu?: boolean
    menuOrder?: number
    adminRoute?: boolean
}
