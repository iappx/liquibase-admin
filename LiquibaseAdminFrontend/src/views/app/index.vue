<template>
  <app-loading>
    <a-layout style="min-height: 100vh">
      <top-nav />
      <a-layout>
        <sidebar />
        <a-layout style="padding: 12px 12px">
          <router-view />
          <app-modals />
          <app-footer />
        </a-layout>
      </a-layout>
    </a-layout>
  </app-loading>
</template>

<script lang="ts">
import { Component, VueBase } from '@i-app/vue-facing-di'
import TopNav from '@/containers/TopNav.vue'
import Sidebar from '@/containers/Sidebar.vue'
import MainLayout from '@/containers/MainLayout.vue'
import AppFooter from '@/components/footer/AppFooter.vue'
import { inject } from 'tsyringe'
import { AntAppStore } from '@/store/modules/antApp/AntAppStore'
import AppLoading from '@/components/app/AppLoading.vue'
import AppModals from '@/components/app/AppModals.vue'

@Component({
  components: { AppModals, AppLoading, AppFooter, MainLayout, Sidebar, TopNav },
})
export default class AppBase extends VueBase {

  constructor(
      @inject(AntAppStore.StoreToken()) private readonly antAppStore: AntAppStore,
  ) {
    super()
  }

  async created(): Promise<void> {
    this.antAppStore.init()
  }
}
</script>
