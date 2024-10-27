<template>
  <a-layout-footer :style="{ textAlign: 'center' }" style="background: none; height: 50px">
    Liquibase admin ©{{ year }}
  </a-layout-footer>
</template>

<script lang="ts">
import { Component, VueBase } from '@i-app/vue-facing-di'
import { DateTime } from 'luxon'

@Component({})
export default class AppFooter extends VueBase {
  public year = DateTime.now().year
}
</script>
