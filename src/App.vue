<template>
  <v-app style="background: rgb(237,237,237);">
    <router-view />
  </v-app>
</template>

<script>
export default {
  name: 'App',
  watch: {
    $route(to, from) {
      const idToken = localStorage.getItem('id_token')
      if (!idToken) {
        this.$router.replace('/')
      }
    }
  }
}
</script>
