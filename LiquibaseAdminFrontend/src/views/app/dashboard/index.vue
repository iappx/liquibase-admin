<template>
  <div>
    <migration-processing-card />
  </div>
</template>

<script lang="ts">
import { Component, VueBase } from '@i-app/vue-facing-di'
import { inject } from 'tsyringe'
import { AntAppStore } from '@/store/modules/antApp/AntAppStore'
import MigrationProcessingCard from '@/domain/migrations/components/MigrationProcessingCard.vue'

@Component({
  components: { MigrationProcessingCard },
})
export default class Dashboard extends VueBase {
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
