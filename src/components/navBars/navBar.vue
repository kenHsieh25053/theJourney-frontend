<template>
  <v-toolbar>
    <v-toolbar-title>theJourney</v-toolbar-title>
    <!-- need to fix it -->
    <v-spacer />
    <login-form />
  </v-toolbar>
</template>

<script>
import LoginForm from '../forms/loginForm'
export default {
  name: 'NavBar',
  components: {
    LoginForm
  }
}
</script>
