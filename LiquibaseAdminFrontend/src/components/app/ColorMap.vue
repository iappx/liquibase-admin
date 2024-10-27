<template>
  <div style="position: absolute; right: 0; bottom: 0">
    <a-modal v-model:open="modalOpened">
      <a-list
          :data-source="colors"
          class="list-hover"
          item-layout="horizontal"
          style="max-height: 500px; overflow: auto"
      >
        <template #renderItem="{ item }">
          <a-list-item>
            <a-list-item-meta>
              <template #title>
                {{ item.name }}
                <template v-if="!item.value.toString().startsWith('#')">
                  : {{ item.value }}
                </template>
              </template>
              <template v-if="item.value.toString().startsWith('#')" #avatar>
                <a-avatar :style="{ backgroundColor: item.value, verticalAlign: 'middle' }" size="large">
                </a-avatar>
              </template>
            </a-list-item-meta>
          </a-list-item>
        </template>
      </a-list>
    </a-modal>
    <a-button @click="modalOpened = true">Theme colors</a-button>
  </div>
</template>

<script lang="ts">
import { Component, VueBase } from '@i-app/vue-facing-di'
import { inject } from 'tsyringe'
import { AppThemeStore } from '@/store/modules/appTheme/AppThemeStore'

type ColorItem = {
  value: string
  name: string
}

@Component({
  components: {},
})
export default class ColorMap extends VueBase {

  public modalOpened = false

  constructor(
      @inject(AppThemeStore.StoreToken()) private readonly appThemeStore: AppThemeStore,
  ) {
    super()
  }

  get colors(): ColorItem[] {
    const keys = Object.keys(this.appThemeStore.themeToken)
    const result: ColorItem[] = []
    for (let i = 0; i < keys.length; i++) {
      const name = keys[i]
      const value = this.appThemeStore.themeToken[name]
      if (value.toString().startsWith('#')) {
        result.push({ name, value })
      }
    }
    return result
  }
}
</script>
