<template>
  <v-toolbar color="#26C6DA">
    <v-toolbar-title>theJourney</v-toolbar-title>
    <v-spacer />
    <v-btn icon>
      <v-icon>mdi-bell-ring-outline</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>mdi-account-multiple-plus-outline</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>mdi-account-circle-outline</v-icon>
    </v-btn>
    <setting-dropdown />
    <v-btn icon>
      <v-icon>mdi-help-circle-outline</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
import SettingDropdown from '../navDropdowns/settingDropdown.vue'
export default {
  name: 'ContentNavBar',
  components: {
    SettingDropdown
  }
}
</script>
