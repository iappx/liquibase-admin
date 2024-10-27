<template>
  <a-tag>
    <a-space size="small">
      <slot name="title">
        <a-typography-text type="secondary">
          {{ title }}
        </a-typography-text>
      </slot>
      {{ value }}
    </a-space>
  </a-tag>
</template>

<script lang="ts">
import { Component, Prop, VueBase } from '@i-app/vue-facing-di'

@Component({
  components: {},
})
export default class InfoTag extends VueBase {
  @Prop({ required: true })
  public readonly value: string

  @Prop({})
  public readonly title: string
}
</script>
