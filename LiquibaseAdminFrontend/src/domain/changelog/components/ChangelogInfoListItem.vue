<template>
  <a-list-item-meta>
    <template #title>
      <info-tag v-for="author in changelog.authors" :key="author" :value="author" title="Author" />
      <info-tag title="Change sets" :value="changelog.changeSets.length" />
    </template>
    <template #description>
      <a-typography-text>
        {{ changelog.logicalFilePath }}
      </a-typography-text>
    </template>
  </a-list-item-meta>
</template>

<script lang="ts">
import { Component, Prop, VueBase } from '@i-app/vue-facing-di'
import { Changelog } from '@/api/entities/Changelog'
import InfoTag from '@/components/display/tag/InfoTag.vue'

@Component({
  components: { InfoTag },
})
export default class ChangelogInfoListItem extends VueBase {
  @Prop({ required: true })
  public readonly changelog: Changelog
}
</script>
