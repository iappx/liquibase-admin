<template>
  <a-space>
    <a-button-group>
      <a-button :disabled="!rollbackCount || loading" @click="runRollback(rollbackCount)">
        <template #icon>
          <left-outlined />
        </template>
        Rollback {{ rollbackCount }}
      </a-button>
      <a-button :disabled="!migrateCount || loading" @click="runMigration(migrateCount)">
        Migrate {{ migrateCount }}
        <right-outlined />
      </a-button>
      <a-button :disabled="loading" @click="runMigration()">
        Migrate all
        <double-right-outlined />
      </a-button>
    </a-button-group>
    <div title="Run a preview of the changes before the operation">
      <a-space>
        SQL First
        <a-switch v-model:checked="sqlFirst" />
      </a-space>
    </div>
    <a-modal :open="modalOpened" width="80%" @cancel="close">
      <template #title>
        <div v-if="sqlResult">
          Migration preview
        </div>
        <div v-else>
          Migration result
        </div>
      </template>
      <template v-if="sqlResult">
        Format response
        <a-switch v-model:checked="formatResponse" />
      </template>
      <a-divider />
      <p-spin-internal :spinning="loading">
        <liquibase-log
            :format-response="formatResponse"
            :raw-log="migrationResult"
            :response-lang="sqlResult ? 'sql' : ''"
        />
      </p-spin-internal>
      <template #footer>
        <a-button @click="close">Close</a-button>
        <a-button v-if="!executed" :loading="loading" type="primary" @click="runCommand(true)">Run</a-button>
      </template>
    </a-modal>
  </a-space>
</template>

<script lang="ts">
import { Component, Prop, VueBase } from '@i-app/vue-facing-di'
import { DoubleRightOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons-vue'
import { AppApi } from '@/api/AppApi'
import { inject } from 'tsyringe'
import PSpinInternal from '@/components/common/spin/PSpinInternal.vue'
import { SqlLiquibaseCommandBase } from '@/domain/liquibase/commands/base/SqlLiquibaseCommandBase'
import { UpdateCountLiquibaseCommand } from '@/domain/liquibase/commands/UpdateCountLiquibaseCommand'
import { UpdateLiquibaseCommand } from '@/domain/liquibase/commands/UpdateLiquibaseCommand'
import { RollbackCountLiquibaseCommand } from '@/domain/liquibase/commands/RollbackCountLiquibaseCommand'
import LiquibaseLog from '@/domain/liquibase/components/LiquibaseLog.vue'
import { TLiquibaseCommandOutput } from '@/api/endpoints/LiquibaseCommandsEndpoint'

@Component({
  components: { LiquibaseLog, PSpinInternal, DoubleRightOutlined, RightOutlined, LeftOutlined },
  emits: ['success'],
})
export default class MigrationActions extends VueBase {
  @Prop({})
  public readonly migrateCount: number

  @Prop({})
  public readonly rollbackCount: number

  public sqlFirst = true
  public formatResponse = false

  public loading = false
  public modalOpened = false
  public migrationResult: TLiquibaseCommandOutput | null = null
  public executed = false

  public savedCommand: SqlLiquibaseCommandBase | null = null

  constructor(
      @inject(AppApi) private readonly appApi: AppApi,
  ) {
    super()
  }

  get sqlResult(): boolean {
    return this.sqlFirst && !this.executed
  }

  public close(): void {
    this.executed = false
    this.migrationResult = null
    this.savedCommand = null
    this.modalOpened = false
  }

  public async runCommand(force = false): Promise<void> {
    if (!this.savedCommand) {
      return
    }
    this.loading = true
    this.modalOpened = true
    try {
      const res = await this.appApi.apiEndpoints.liquibaseCommands.runSqlCommand(this.savedCommand, force)
      this.migrationResult = res.output
    } finally {
      this.loading = false
    }
    if (force) {
      this.$emit('success')
      this.executed = true
    }
  }

  public async runMigration(count?: number): Promise<void> {
    if (count) {
      this.savedCommand = new UpdateCountLiquibaseCommand(count)
    } else {
      this.savedCommand = new UpdateLiquibaseCommand()
    }
    await this.runCommand(!this.sqlFirst)
  }

  public async runRollback(count: number): Promise<void> {
    this.savedCommand = new RollbackCountLiquibaseCommand(count)
    await this.runCommand(!this.sqlFirst)
  }
}
</script>
