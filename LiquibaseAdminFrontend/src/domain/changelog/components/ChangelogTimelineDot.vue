<template>
  <a-tooltip style="font-size: 16px">
    <template #title>
      {{ changelog.databaseChangelog?.executionType || 'NOT_EXECUTED' }}
    </template>
    <check-circle-outlined v-if="changelog.databaseChangelog?.executed" />
    <right-circle-outlined v-else-if="changelog.databaseChangelog?.markRan" />
    <minus-circle-outlined v-else />
  </a-tooltip>
</template>

<script lang="ts">
import { Component, Prop, VueBase } from '@i-app/vue-facing-di'
import { CheckCircleOutlined, MinusCircleOutlined, RightCircleOutlined } from '@ant-design/icons-vue'
import { Changelog } from '@/api/entities/Changelog'

@Component({
  components: { RightCircleOutlined, MinusCircleOutlined, CheckCircleOutlined },
})
export default class ChangelogTimelineDot extends VueBase {
  @Prop({ required: true })
  public readonly changelog: Changelog
}
</script>
