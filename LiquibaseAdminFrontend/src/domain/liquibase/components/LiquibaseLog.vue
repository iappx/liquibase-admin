<template>
  <pre style="max-height: 60vh; overflow: auto"><code
      v-for="block in resultBlocks"
      class="language-sql"
      v-html="block"
  /></pre>
</template>

<script lang="ts">
import { Component, Prop, VueBase } from '@i-app/vue-facing-di'
import hljs from 'highlight.js'
import sql from 'highlight.js/lib/languages/sql'
import 'highlight.js/styles/default.css'
import 'highlight.js/styles/vs2015.css'
import { TLiquibaseCommandOutput } from '@/api/endpoints/LiquibaseCommandsEndpoint'
import { format } from 'sql-formatter'

hljs.registerLanguage('sql', sql)

@Component({})
export default class LiquibaseLog extends VueBase {
  @Prop({ required: true })
  public readonly rawLog: TLiquibaseCommandOutput

  @Prop({})
  public readonly formatResponse: boolean

  @Prop({ default: true })
  public readonly responseLang: string

  get resultBlocks(): string[] {
    if (!this.rawLog) {
      return []
    }
    const logBlocks = [`<p>${ this.rawLog.error }</p>`]
    let code = this.rawLog.result
    if (this.formatResponse && this.responseLang) {
      code = format(this.rawLog.result, {
        language: 'postgresql',
        tabWidth: 2,
        linesBetweenQueries: 2,
      })
    }
    if (this.responseLang) {
      code = hljs.highlight(code, {
        language: this.responseLang,
      }).value
    }
    logBlocks.push(`<p>${ code }</p>`)
    return logBlocks
  }
}
</script>
