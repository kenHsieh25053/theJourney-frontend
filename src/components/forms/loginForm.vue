<template>
  <v-form ref="form" v-model="valid" :lazy-validation="lazy">
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="credential.email"
            type="email"
            :rules="emailRules"
            label="E-mail"
            dense
            required
          />
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="credential.password"
            type="password"
            :rules="passwordRules"
            label="Password"
            dense
            required
          />
        </v-col>
        <v-col cols="12" md="4">
          <v-btn color="success" :loading="loading" dark @click="login">
            Login
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <Alert
      :alert-show="alertShow"
      :alert-message="alertMessage"
      :color="color"
      @alertShow="closeSnackbar"
    />
  </v-form>
</template>

<script>
import Alert from '../alert'
import { USER_LOGIN } from '@/schemas/mutaion.js'

export default {
  name: 'LoginForm',
  components: {
    Alert
  },
  data: () => ({
    valid: true,
    lazy: false,
    loading: false,
    credential: {
      email: '',
      password: ''
    },
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid'
    ],
    passwordRules: [v => !!v || 'Password is required'],
    // alert props
    color: '',
    alertShow: false,
    alertMessage: ''
  }),
  methods: {
    async login() {
      // validdate form value
      if (!this.$refs.form.validate()) {
        return
      }
      this.loading = true
      try {
        const res = await this.$apollo.mutate({
          mutation: USER_LOGIN,
          variables: this.credential
        })
        const status = res.data.login.status
        switch (status) {
          case '200': {
            localStorage.setItem('id_token', res.data.login.id_token)
            this.$router.replace('/content').catch(err => {
              console.log(err)
            })
            break
          }
          case '403': {
            this.alertShow = true
            this.color = 'warning'
            this.alertMessage = res.data.login.message
            break
          }
          case '500': {
            this.alertShow = true
            this.color = 'error'
            this.alertMessage = res.data.login.message
            break
          }
          default: {
            this.alertShow = true
            this.color = 'error'
            this.alertMessage = res.message
            break
          }
        }
      } catch (err) {
        this.alertMessage = err
        this.alertDialog = true
      }
      this.loading = false
    },
    closeSnackbar(close) {
      // send new status to prop
      this.alertShow = close
    }
  }
}
</script>
