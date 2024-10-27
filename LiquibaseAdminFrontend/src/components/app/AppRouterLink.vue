<template>
  <a-typography-link :href="href" @click="navigate">
    <slot />
  </a-typography-link>
</template>

<script lang="ts">
import { Component, Prop, VueBase, Watch } from '@i-app/vue-facing-di'
import { RouteLocationRaw } from 'vue-router'

@Component({
  emits: ['click'],
})
export default class AppRouterLink extends VueBase {
  @Prop({ required: true })
  public readonly to: RouteLocationRaw

  public href = ''

  navigate(e: Event): void {
    e.preventDefault()
    this.$router.push(this.to)
    this.$emit('click')
  }

  @Watch('to', { deep: true })
  mounted(): void {
    this.href = this.$router.resolve(this.to).href
  }
}
</script>
