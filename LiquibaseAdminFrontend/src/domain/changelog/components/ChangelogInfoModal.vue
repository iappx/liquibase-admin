<template>
  <a-modal v-model:open="visible">
    {{ changelog }}
  </a-modal>
</template>

<script lang="ts">
import { Component, VueBase } from '@i-app/vue-facing-di'
import { Changelog } from '@/api/entities/Changelog'
import { inject } from 'tsyringe'
import { EventBus } from '@/services/eventBus/EventBus'
import { OpenChangelogInfoEvent } from '@/domain/changelog/events/OpenChangelogInfoEvent'

@Component({})
export default class ChangelogInfoModal extends VueBase {

  public changelog: Changelog | null = null
  public visible = false

  constructor(
      @inject(EventBus) private readonly eventBus: EventBus,
  ) {
    super()
  }

  public mounted(): void {
    this.eventBus.registerHandler(OpenChangelogInfoEvent, e => {
      this.visible = true
      this.changelog = e.changelog
    })
  }
}
</script>
