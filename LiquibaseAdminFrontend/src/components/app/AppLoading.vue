<template>
  <div v-if="loading" class="loading"></div>
  <div v-else id="app-container">
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, VueBase } from '@i-app/vue-facing-di'
import TopNav from '@/containers/TopNav.vue'
import Sidebar from '@/containers/Sidebar.vue'

@Component({
  components: { Sidebar, TopNav },
})
export default class AppLoading extends VueBase {
  public loading = true

  constructor() {
    super()
  }

  async mounted(): Promise<void> {
    try {

    } catch (err) {
      console.log(err)
      this.$router.push('/user/login')
    } finally {
      this.loading = false
    }
  }
}
</script>
