import { theme } from 'ant-design-vue'
import { GlobalToken } from 'ant-design-vue/es/theme/interface'
import { InjectableStore, StoreBase } from '@/lib/vue-store'
import { inject } from 'tsyringe'
import { EventBus } from '@/services/eventBus/EventBus'
import { AppEnvironment } from '@/config/AppEnvironment'

export enum AppTheme {
    Light = 0,
    Dark = 1
}

@InjectableStore('AppThemeStore')
export class AppThemeStore extends StoreBase<AppThemeStore> {
    public themeAlgorithm = theme.defaultAlgorithm
    public appTheme = AppTheme.Light
    public themeToken: GlobalToken & Record<string, any> = {} as any

    private readonly themeClasses = {
        [AppTheme.Light]: {
            dev: 'css-dev-only-do-not-override-16pw25h',
            prod: 'css-16pw25h',
        },
        [AppTheme.Dark]: {
            dev: 'css-dev-only-do-not-override-welh7p',
            prod: 'css-welh7p',
        },
    }

    get isDarkTheme(): boolean {
        return this.appTheme == AppTheme.Dark
    }

    lastToken: Record<string, any> = {}

    constructor(
        @inject(EventBus) private readonly eventBus: EventBus,
    ) {
        super()
    }

    toggleTheme(): void {
        if (this.appTheme == AppTheme.Light) {
            this.setTheme(AppTheme.Dark)
        } else {
            this.setTheme(AppTheme.Light)
        }
        const keys = Object.keys(this.themeToken)
        const diff: Record<string, any> = {}
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i]
            if (this.lastToken[key] != this.themeToken[key]) {
                diff[key] = [this.lastToken[key], this.themeToken[key]]
            }
        }
        this.lastToken = this.themeToken
    }

    setTheme(appTheme: AppTheme): void {
        if (appTheme == AppTheme.Light) {
            this.themeAlgorithm = theme.defaultAlgorithm
            this.appTheme = AppTheme.Light
        } else {
            this.themeAlgorithm = theme.darkAlgorithm
            this.appTheme = AppTheme.Dark
        }
        this.save()
        this.updateNodes(appTheme)
    }

    public init(): void {
        const dark = localStorage.getItem('dark')
        if (dark == 'true') {
            this.setTheme(AppTheme.Dark)
        } else {
            this.setTheme(AppTheme.Light)
        }
    }

    public save(): void {
        localStorage.setItem('dark', this.isDarkTheme ? 'true' : 'false')
    }

    public updateNodes(appTheme: AppTheme): void {
        let lastClass = ''
        if (appTheme == AppTheme.Light) {
            lastClass = this.getThemeClass(AppTheme.Dark)
        } else {
            lastClass = this.getThemeClass(AppTheme.Light)
        }
        const nextClass = this.getThemeClass(appTheme)
        const nodes = document.querySelectorAll(`.${lastClass}`)
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i]
            node.className = node.className.split(' ').map(p => p == lastClass ? nextClass : p).join(' ')
        }
    }

    public getThemeClass(appTheme: AppTheme): string {
        if (AppEnvironment.Dev) {
            return this.themeClasses[appTheme].dev
        } else {
            return this.themeClasses[appTheme].prod
        }
    }
}
