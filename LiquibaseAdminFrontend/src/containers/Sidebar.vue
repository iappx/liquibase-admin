<template>
  <a-layout-sider
      v-model:collapsed="menuStore.collapsed"
      :style="{ background: appThemeStore.themeToken.colorTextBase }"
      :trigger="null"
      breakpoint="lg"
      collapsed-width="0"
      collapsible
  >
    <a-menu
        :items="menuStore.menuItems"
        :open-keys.sync="openKeys"
        :selected-keys.sync="selectedKeys"
        class="main-layout-sider-menu"
        mode="inline"
        style="height: 100%"
        @click="menuItemClick"
    >
    </a-menu>
  </a-layout-sider>
</template>

<script lang="ts">
import { Component, VueBase, Watch } from '@i-app/vue-facing-di'
import { MenuStore } from '@/store/MenuStore'
import { RouteRecordRaw } from 'vue-router'
import { AppThemeStore } from '@/store/modules/appTheme/AppThemeStore'
import { inject } from 'tsyringe'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'

@Component({
  components: { MenuUnfoldOutlined, MenuFoldOutlined },
})
export default class Sidebar extends VueBase {
  public openKeys: string[] = []
  public selectedKeys: string[] = []

  constructor(
      @inject(AppThemeStore.StoreToken()) public readonly appThemeStore: AppThemeStore,
      @inject(MenuStore.StoreToken()) public readonly menuStore: MenuStore,
  ) {
    super()
  }

  menuItemClick({ item }): void {
    this.$router.push(item.path)
  }

  setSelectedMenu(route/*: Route*/): void {
    if (route.matched) {
      let openMenu = route.matched[route.matched.length - 1].parent?.name
      if (route.meta?.openedMenu) {
        openMenu = route.meta.openedMenu
      }
      this.menuStore.setOpenedMenu(openMenu)
    }
    this.menuStore.setSelectedSidebar(route.meta?.selectedMenu ? route.meta.selectedMenu : route.name)
    this.openKeys.push(this.menuStore.openedMenu)
    this.selectedKeys = [this.menuStore.selectedMenu]
  }

  created(): void {
    this.menuStore.loadMenu()
    this.setSelectedMenu(this.$route)
  }

  @Watch('$route')
  routeChanged(to: RouteRecordRaw, from: RouteRecordRaw): void {
    this.setSelectedMenu(this.$route)
    if (to.path !== from.path) {
      window.scrollTo(0, 0)
    }
  }
}
</script>
