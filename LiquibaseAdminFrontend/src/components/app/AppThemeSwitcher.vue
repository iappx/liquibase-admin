<template>
  <a-tooltip placement="bottomRight">
    <template #title>
      <span>{{ appThemeStore.isDarkTheme ? 'Light' : 'Dark' }} Theme</span>
    </template>
    <bulb-outlined
        v-if="appThemeStore.isDarkTheme"
        :style="{ color: color }"
        class="header-tools-item"
        @click="switchTheme"
    />
    <bulb-filled v-else :style="{ color: color }" class="header-tools-item" @click="switchTheme" />
  </a-tooltip>
</template>

<script lang="ts">
import { Component, Prop, VueBase } from '@i-app/vue-facing-di'
import { BulbFilled, BulbOutlined } from '@ant-design/icons-vue'
import { AppThemeStore } from '@/store/modules/appTheme/AppThemeStore'
import { inject } from 'tsyringe'

@Component({
  components: { BulbOutlined, BulbFilled },
})
export default class AppThemeSwitcher extends VueBase {

  @Prop({ required: false })
  public readonly color: string

  constructor(
      @inject(AppThemeStore.StoreToken()) public readonly appThemeStore: AppThemeStore,
  ) {
    super()
  }

  switchTheme(): void {
    this.appThemeStore.toggleTheme()
  }
}
</script>
