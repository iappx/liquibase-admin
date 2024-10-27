<template>
  <a-layout-header class="site-header">
    <menu-unfold-outlined
        v-if="menuStore.collapsed"
        @click="menuStore.collapsedTrigger"
    />
    <menu-fold-outlined v-else class="trigger" @click="menuStore.collapsedTrigger" />
    <div style="flex: 1 1 0;"></div>
    <a-space :size="8" align="center" class="header-tools">
      <app-theme-switcher />
    </a-space>
  </a-layout-header>
</template>

<script lang="ts">
import { Component, VueBase } from '@i-app/vue-facing-di'
import AppThemeSwitcher from '@/components/app/AppThemeSwitcher.vue'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'
import { inject } from 'tsyringe'
import { AppThemeStore } from '@/store/modules/appTheme/AppThemeStore'
import { MenuStore } from '@/store/MenuStore'

@Component({
  components: {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    AppThemeSwitcher,
  },
})
export default class TopNav extends VueBase {
  constructor(
      @inject(AppThemeStore.StoreToken()) public readonly appThemeStore: AppThemeStore,
      @inject(MenuStore.StoreToken()) public readonly menuStore: MenuStore,
  ) {
    super()
  }
}
</script>
