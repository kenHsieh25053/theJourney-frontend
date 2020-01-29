<template>
  <div>
    <nav-bar />
    <v-container fluid>
      <v-row no-gutters>
        <v-col cols="12" sm="6" md="8">
          <v-img
            src="@/assets/mainPageImg.svg"
            max-height="540"
            max-width="750"
          />
        </v-col>
        <v-col cols="6" md="4" align-self="center">
          <signup-form />
        </v-col>
      </v-row>
    </v-container>
    <Footer />
  </div>
</template>

<script>
import NavBar from '../components/navBars/navBar'
import Footer from '../components/footer'
import SignupForm from '../components/forms/signupForm'
export default {
  name: 'MainPage',
  components: {
    NavBar,
    SignupForm,
    Footer
  }
}
</script>
