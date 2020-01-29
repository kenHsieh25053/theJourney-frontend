<template>
  <v-card max-width="380">
    <v-card-title>
      Signup now!
    </v-card-title>
    <v-card-subtitle>
      start to explore travel log!
    </v-card-subtitle>
    <v-form ref="form" v-model="valid" :lazy-validation="lazy">
      <v-container>
        <v-col>
          <v-text-field
            v-model="credential.username"
            type="name"
            :rules="usernameRules"
            placeholder="Username"
            outlined
            dense
            required
          />
        </v-col>
        <v-col>
          <v-text-field
            v-model="credential.email"
            type="email"
            :rules="emailRules"
            placeholder="Email"
            outlined
            dense
            required
          />
        </v-col>
        <v-col>
          <v-text-field
            v-model="credential.password"
            type="password"
            :rules="passwordRules"
            placeholder="Password"
            outlined
            dense
            required
          />
        </v-col>
        <v-col>
          <v-btn color="primary" :loading="loading" dark @click="signup">
            Signup
          </v-btn>
        </v-col>
      </v-container>
      <Alert
        :alert-show="alertShow"
        :alert-message="alertMessage"
        :color="color"
        @alertShow="closeSnackbar"
      />
    </v-form>
  </v-card>
</template>

<script>
import gql from 'graphql-tag'
import Alert from '../alert'

const USER_SIGNUP = gql`
  mutation Signup($email: String!, $username: String!, $password: String!) {
    signup(email: $email, username: $username, password: $password) {
      status
      message
    }
  }
`

export default {
  name: 'SignupForm',
  components: {
    Alert
  },
  data: () => ({
    valid: true,
    lazy: false,
    loading: false,
    credential: {
      email: '',
      username: '',
      password: ''
    },
    usernameRules: [v => !!v || 'Username is required'],
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
    async signup() {
      // validdate form value
      if (!this.$refs.form.validate()) {
        return
      }
      this.loading = true
      console.log(this.credential)
      try {
        const res = await this.$apollo.mutate({
          mutation: USER_SIGNUP,
          variables: this.credential
        })
        const status = res.data.signup.status
        switch (status) {
          case '200': {
            this.alertShow = true
            this.alertMessage = res.data.signup.message
            try {
              await this.$router.replace('/')
            } catch (err) {
              console.log(err)
            }
            break
          }
          case '403': {
            this.alertShow = true
            this.color = 'error'
            this.alertMessage = res.data.signup.message
            break
          }
          case '500': {
            this.alertShow = true
            this.color = 'error'
            this.alertMessage = res.data.signup.message
            break
          }
        }
      } catch (err) {
        this.alertDialog = true
        this.alertMessage = err
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
