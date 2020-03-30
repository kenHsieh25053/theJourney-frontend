<template>
  <div class="text-center">
    <v-menu :offset-y="true">
      <template v-slot:activator="{ on: menu }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on: tooltip }">
            <v-btn icon v-on="{ ...tooltip, ...menu }">
              <v-icon>mdi-settings-outline</v-icon>
            </v-btn>
          </template>
          <span>設定</span>
        </v-tooltip>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          @click="logout"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: 'SettingDropdown',
  data: () => ({
    items: [{ title: '登出' }]
  }),
  methods: {
    logout() {
      localStorage.removeItem('id_token')
      this.$router.replace('/').catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
