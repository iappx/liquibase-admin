<template>
  <a-card>
    <template #title>
      <migration-actions :migrate-count="migrateSelectedCount" :rollback-count="rollbackSelectedCount" @success="reloadData" />
    </template>
    <a-timeline
        v-v-infinite-scroll="[loadMore, { distance: 500 }]"
        :pending="loading"
        style="max-height: calc(100vh - 230px); overflow: auto; padding: 10px; padding-left: 20px"
    >
      <a-timeline-item v-for="(item, i) in loadedEntities" :key="i" :color="getItemColor(item as any)">
        <template #dot>
          <a-space>
            <a-checkbox :checked="checked[item.id]" @change="checkChange(i)" />
            <changelog-timeline-dot :changelog="item" />
          </a-space>
        </template>
        <changelog-info-list-item :changelog="item" />
      </a-timeline-item>
    </a-timeline>
  </a-card>
</template>

<script lang="ts">
import { Component, VueBase } from '@i-app/vue-facing-di'
import { vInfiniteScroll } from '@vueuse/components'
import { AppApiContext } from '@/api/context/AppApiContext'
import { inject } from 'tsyringe'
import { Changelog } from '@/api/entities/Changelog'
import ChangelogTimelineDot from '@/domain/changelog/components/ChangelogTimelineDot.vue'
import ChangelogInfoListItem from '@/domain/changelog/components/ChangelogInfoListItem.vue'
import { DoubleRightOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons-vue'
import MigrationActions from '@/domain/migrations/components/MigrationActions.vue'

@Component({
  components: {
    MigrationActions,
    ChangelogInfoListItem,
    ChangelogTimelineDot,
    LeftOutlined,
    RightOutlined,
    DoubleRightOutlined,
  },
  directives: {
    vInfiniteScroll,
  },
})
export default class MigrationProcessingCard extends VueBase {
  public loading = false

  public allEntities: Changelog[] = []

  public loadedEntities: Changelog[] = []
  public loadedEntitiesMap: Record<string, Changelog> = {}

  public checked: Record<string, boolean> = {}

  constructor(
      @inject(AppApiContext) private readonly appApiContext: AppApiContext,
  ) {
    super()
  }

  public get rollbackSelectedCount(): number {
    const keys = Object.keys(this.checked)
    let result = 0
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      const changelog = this.loadedEntitiesMap[key]
      if (this.checked[key] && changelog.executed) {
        result += changelog.changeSets.length
      }
    }
    return result
  }

  public get migrateSelectedCount(): number {
    const keys = Object.keys(this.checked)
    let result = 0
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      const changelog = this.loadedEntitiesMap[key]
      if (this.checked[key] && !changelog.executed) {
        result += changelog.changeSets.length
      }
    }
    return result
  }

  public loadMore(): void {
    const batch = this.allEntities.splice(0, 10)
    this.loadedEntities.push(...batch)
    for (let i = 0; i < batch.length; i++) {
      const item = batch[i]
      this.loadedEntitiesMap[item.id] = item
    }
  }

  public checkChange(index: number): void {
    const item = this.loadedEntities[index]
    const value = this.checked[item.id]

    this.checked[item.id] = !value
    if (item.executed) {
      for (let i = 0; i < index; i++) {
        const entity = this.loadedEntities[i]
        this.checked[entity.id] = entity.executed
      }
      for (let i = index + 1; i < this.loadedEntities.length; i++) {
        const entity = this.loadedEntities[i]
        delete this.checked[entity.id]
      }
    } else {
      for (let i = 0; i < index; i++) {
        const entity = this.loadedEntities[i]
        this.checked[entity.id] = entity.executed
      }
      for (let i = index + 1; i < this.loadedEntities.length; i++) {
        const entity = this.loadedEntities[i]
        this.checked[entity.id] = !entity.executed
      }
    }
  }

  public getItemColor(item: Changelog): string {
    switch (item.databaseChangelog?.executionType) {
      case 'MARK_RAN':
        return 'blue'
      case 'EXECUTED':
        return 'green'
      default:
        return 'gray'
    }
  }

  async mounted(): Promise<void> {
    await this.reloadData()
  }

  async reloadData(): Promise<void> {
    this.loading = true
    try {
      this.allEntities = await this.appApiContext.changelog.getAll()
      this.loadedEntities = []
      this.loadedEntitiesMap = {}
      this.checked = {}
      this.loadMore()
    } finally {
      this.loading = false
    }
  }
}
</script>
