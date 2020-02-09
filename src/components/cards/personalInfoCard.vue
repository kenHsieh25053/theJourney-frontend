<template>
  <v-card max-width="344" class="mx-auto">
    <v-list-item>
      <v-list-item-avatar color="grey" />
      <v-list-item-content>
        <v-list-item-title class="headline">{{
          userProfile.username
        }}</v-list-item-title>
        <v-list-item-subtitle>旅遊新手</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider />
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="headline">{{
          userProfile.countries
        }}</v-list-item-title>
        <v-list-item-subtitle>國家</v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-content>
        <v-list-item-title class="headline">{{
          userProfile.cities
        }}</v-list-item-title>
        <v-list-item-subtitle>城市</v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-content>
        <v-list-item-title class="headline">{{
          userProfile.touristSpots
        }}</v-list-item-title>
        <v-list-item-subtitle>景點</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <Alert
      :alert-show="alertShow"
      :alert-message="alertMessage"
      :color="color"
      @alertShow="closeSnackbar"
    />
  </v-card>
</template>

<script>
import Alert from '../alert'
import { GET_USERPROFILE } from '@/schemas/query.js'

export default {
  name: 'PersonalInfoCard',
  components: {
    Alert
  },
  data() {
    return {
      userProfile: {},
      alertShow: false,
      alertMessage: '',
      color: ''
    }
  },
  apollo: {
    userProfile: {
      query: GET_USERPROFILE,
      manual: true,
      result({ data, loading, networkStatus }) {
        switch (data.userProfile.status) {
          case '200': {
            const res = data.userProfile.userProfile
            this.userProfile = res
            break
          }
          case '500': {
            this.alertMessage = data.userProfile.message
            this.color = 'error'
            this.alertShow = true
            break
          }
          default: {
            this.alertMessage = data.userProfile.message
            this.color = 'error'
            this.alertShow = true
          }
        }
      }
    }
  },
  methods: {
    closeSnackbar(close) {
      // send new status to prop
      this.alertShow = close
    }
  }
}
</script>
