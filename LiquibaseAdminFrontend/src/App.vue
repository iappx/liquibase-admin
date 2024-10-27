<template>
  <a-config-provider :theme="{
      algorithm: appThemeStore.themeAlgorithm,
    }">
    <template #renderEmpty>
      <a-empty description="No data" :image="emptyImage" />
    </template>
    <a-app>
      <router-view />
      <!--<color-map />-->
    </a-app>
  </a-config-provider>
</template>

<script lang="ts">
import { Component, VueBase } from '@i-app/vue-facing-di'
import { SmileOutlined } from '@ant-design/icons-vue'
import { Empty, theme } from 'ant-design-vue'
import { AppThemeStore } from '@/store/modules/appTheme/AppThemeStore'
import { inject } from 'tsyringe'
import ColorMap from '@/components/app/ColorMap.vue'

@Component({ components: { ColorMap, SmileOutlined } })
export default class App extends VueBase {
  emptyImage = Empty.PRESENTED_IMAGE_SIMPLE

  constructor(
      @inject(AppThemeStore.StoreToken()) public readonly appThemeStore: AppThemeStore,
  ) {
    super()
  }

  created() {
    this.appThemeStore.init()
    this.appThemeStore.themeToken = theme.useToken().token as any
  }
}
</script>
