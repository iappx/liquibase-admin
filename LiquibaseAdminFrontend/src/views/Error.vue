<template>
  <a-result status="404" sub-title="Page not found" title="404">
    <template #extra>
      <a-button type="primary" @click="goBack">
        Main page
      </a-button>
    </template>
  </a-result>
</template>

<script lang="ts">
import { Component, VueBase } from '@i-app/vue-facing-di'

@Component({})
export default class Error extends VueBase {
  goBack() {
    this.$router.push('/')
  }
}
</script>

<style scoped>

</style>
