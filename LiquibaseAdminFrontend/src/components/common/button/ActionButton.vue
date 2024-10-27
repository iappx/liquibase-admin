<template>
  <a-button
      :loading="loading"
      :type="type"
      :disabled="disabled"
      @click="actionHandler"
  >
    <template #icon>
      <slot name="icon" />
    </template>
  </a-button>
</template>

<script lang="ts">
import { Component, Prop, VueBase } from '@i-app/vue-facing-di'
import { StarOutlined } from '@ant-design/icons-vue'

@Component({
  components: { StarOutlined },
})
export default class ActionButton extends VueBase {
  @Prop({ required: false })
  public type: string

  @Prop({ required: true })
  public action: () => Promise<void>

  @Prop({})
  public readonly disabled: boolean

  public loading = false

  async actionHandler(): Promise<void> {
    this.loading = true
    try {
      await this.action()
    } finally {
      this.loading = false
    }
  }
}
</script>
