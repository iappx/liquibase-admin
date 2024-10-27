<template>
  <a-spin :delay="delay" :spinning="spinning" tip="Loading" style="width: 100%">
    <template #indicator>
      <loading-outlined style="font-size: 24px" />
    </template>
    <div v-if="mountDuringLoading ? true : !spinning" style="min-height: 25px">
      <slot />
    </div>
  </a-spin>
</template>

<script lang="ts">
import { Component, Prop, VueBase } from '@i-app/vue-facing-di'
import { LoadingOutlined } from '@ant-design/icons-vue'

@Component({
  components: { LoadingOutlined },
})
export default class PSpinInternal extends VueBase {
  @Prop({ default: false })
  public readonly spinning: boolean

  @Prop({ default: false })
  public readonly mountDuringLoading: boolean

  @Prop({ default: 300 })
  public readonly delay: number
}
</script>
