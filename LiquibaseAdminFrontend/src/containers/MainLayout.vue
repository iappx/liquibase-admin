<template>
  <div>
    <a-layout-content class="main-layout">
      <router-view />
    </a-layout-content>
  </div>
</template>

<script lang="ts">
import { Component, VueBase } from '@i-app/vue-facing-di'

@Component({})
export default class MainLayout extends VueBase {
}
</script>
