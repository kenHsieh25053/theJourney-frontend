<template>
  <v-form ref="form" v-model="valid" :lazy-validation="lazy">
    <v-container>
      <!-- add travellist -->
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="travellistPost.name"
            type="text"
            label="行程名稱"
            prepend-icon="mdi-map"
            solo
            required
          />
        </v-col>
        <v-col cols="12" md="4">
          <v-select
            :items="typeItems"
            item-value="value"
            v-model="travellistPost.types"
            label="旅遊類型"
            prepend-icon="mdi-wallet-travel"
            solo
          />
        </v-col>
        <v-col cols="12" md="4">
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="dateRangeText"
                label="日期"
                prepend-icon="mdi-calendar-text"
                readonly
                solo
                v-on="on"
              />
            </template>
            <v-date-picker ref="picker" v-model="dates" range />
          </v-menu>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-combobox
            label="選擇國家"
            :items="countryItems"
            :search-input.sync="search"
            prepend-icon="mdi-airplane-takeoff"
            v-model="travellistPost.countries"
            deletable-chips
            clearable
            multiple
            hide-selected
            chips
            solo
          >
            <template v-slot:no-data>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    No results matching "<strong> {{ search }} </strong>"
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-combobox>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-textarea
            label="評論"
            auto-grow
            v-model="travellistPost.review"
            prepend-icon="mdi-comment-text"
            solo
          />
        </v-col>
      </v-row>
      <!-- add city  -->
      <v-row>
        <v-col cols="12" md="4">
          <p>cityname</p>
        </v-col>
        <v-col cols="12" md="4">
          <p>datetimepicker</p>
        </v-col>
        <v-col cols="12" md="4">
          <p>transpotation</p>
        </v-col>
      </v-row>
      <v-row>
        <v-spacer />
        <v-col cols="12" sm="3">
          <v-select
            :items="permissionItems"
            item-value="value"
            v-model="travellistPost.permissions"
            label="權限"
            solo
            dense
          />
        </v-col>
        <v-col cols="12" sm="2">
          <v-btn color="success" @click="submit" dense>
            發佈
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
// import gql from 'graphql-tag'
import Alert from '../alert'

// const POST_TRAVELLISTPOST = gql`
//   mutation travelListPost(
//     $id: ID
//     $name: String!
//     $tags: [String]
//     $type: String
//     $stayFrom: String!
//     $stayTo: String!
//     $transportation: String
//     $review: String
//     $permissions: String!
//   ) {
//     travelListPost(
//       id: $id
//       name: $name
//       tags: $tags
//       type: $type
//       stayFrom: $stayFrom
//       stayTo: $stayTo
//       transportation: $transportation
//       review: $review
//       permissions: $permissions
//     ) {
//       status
//       message
//       travellists {
//         id
//         name
//         tags
//         type
//         stayFrom
//         stayTo
//         days
//         costs
//         rates
//         likes
//         comments
//         permissions
//         transportation
//         review
//         createdAt
//         updatedAt
//         userId
//         cities {
//           id
//           name
//           longtitude
//           latitude
//           stayFrom
//           stayTo
//           costs
//           rates
//           transportation
//           review
//           photo_url
//           createdAt
//           updatedAt
//           travelListId
//           # touristSpots {

//           # }
//         }
//       }
//     }
//   }
// `

export default {
  name: 'TravelListPostForm',
  components: {
    Alert
  },
  data: () => ({
    valid: true,
    lazy: false,
    loading: false,
    menu: false,
    // travellistpost form
    travellistPost: {
      name: '',
      types: '',
      countries: [],
      review: '',
      permissions: ''
    },
    typeItems: [
      { text: '背包客', value: 'BACKPACK' },
      { text: '商務旅行', value: 'BUSSINESSTRIP' },
      { text: '家族旅遊', value: 'FAMILYTRIP' },
      { text: '跟團', value: 'TOURGROUP' }
    ],
    dates: [],
    permissionItems: [
      { text: '公開', value: 'PUBLIC' },
      { text: '僅限好友', value: 'FRIENDONLY' },
      { text: '僅限自己', value: 'ONLYME' }
    ],
    search: null,
    countryItems: ['tw', 'america', 'japan'],
    // alert props
    color: '',
    alertShow: false,
    alertMessage: ''
  }),
  computed: {
    dateRangeText() {
      return this.dates.join(' ~ ')
    }
  },
  methods: {
    async submit() {
      const stayFrom = this.dates[0]
      console.log(stayFrom)
      console.log(this.travellistPost.permissions)
      // validdate form value
      // if (!this.$refs.form.validate()) {
      //   return
      // }
      // this.loading = true
      // try {
      //   const res = await this.$apollo.mutate({
      //     mutation: POST_TRAVELLISTPOST,
      //     variables: this.credential
      //   })
      //   const status = res.data.login.status
      //   switch (status) {
      //     case '200': {
      //       localStorage.setItem('id_token', res.data.login.id_token)
      //       this.$router.replace('/content').catch(err => {
      //         console.log(err)
      //       })
      //       break
      //     }
      //     case '403': {
      //       this.alertShow = true
      //       this.color = 'warning'
      //       this.alertMessage = res.data.login.message
      //       break
      //     }
      //     case '500': {
      //       this.alertShow = true
      //       this.color = 'error'
      //       this.alertMessage = res.data.login.message
      //       break
      //     }
      //     default: {
      //       this.alertShow = true
      //       this.color = 'error'
      //       this.alertMessage = res.errors
      //       break
      //     }
      //   }
      // } catch (err) {
      //   this.alertMessage = err
      //   this.alertDialog = true
      // }
      // this.loading = false
    },
    closeSnackbar(close) {
      // send new status to prop
      this.alertShow = close
    }
  }
}
</script>
