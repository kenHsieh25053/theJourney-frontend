<template>
  <v-form ref="form" v-model="isFormValid">
    <v-container fill-height>
      <!-- add travellist -->
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="travellistPost.name"
            type="text"
            label="行程名稱"
            prepend-inner-icon="mdi-map"
            solo
            required
          />
        </v-col>
        <v-col cols="12" md="4">
          <v-select
            v-model="travellistPost.types"
            :items="typeItems"
            item-value="value"
            label="旅遊類型"
            prepend-inner-icon="mdi-wallet-travel"
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
                prepend-inner-icon="mdi-calendar-text"
                readonly
                solo
                v-on="on"
              />
            </template>
            <v-date-picker ref="picker" v-model="dates" locale="zh-cn" range />
          </v-menu>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-autocomplete
            v-model="travellistPost.countries"
            :disabled="isUpdating"
            :items="countryItems"
            prepend-inner-icon="mdi-airplane-takeoff"
            filled
            chips
            label="選擇國家"
            item-text="name"
            item-value="name"
            counter="249"
            clearable
            multiple
            solo
          >
            <template v-slot:selection="data">
              <v-chip
                v-bind="data.attrs"
                :input-value="data.selected"
                close
                @click="data.select"
                @click:close="remove(data.item)"
              >
                <v-avatar left>{{ data.item.emoji }}</v-avatar>
                {{ data.item.name }}
              </v-chip>
            </template>
            <template v-slot:item="data">
              <template v-if="typeof data.item !== 'object'">
                <v-list-item-content v-text="data.item" />
              </template>
              <template v-else>
                <v-list-item-avatar>{{ data.item.emoji }}</v-list-item-avatar>
                <v-list-item-content>{{ data.item.name }}</v-list-item-content>
              </template>
            </template>
          </v-autocomplete>
        </v-col>
      </v-row>
      <v-row class="pb-0">
        <v-col cols="12">
          <v-textarea
            v-model="travellistPost.review"
            label="評論"
            auto-grow
            prepend-inner-icon="mdi-comment-text"
            solo
          />
        </v-col>
      </v-row>
      <!-- add city  -->
      <v-row
        class="pb-0"
        v-for="(city, index) in cities"
        :key="index"
        align-content="center"
        justify="center"
        dense
      >
        <v-col cols="12" md="3" sm="3">
          <v-text-field
            v-model="city.name"
            type="text"
            label="城市名稱"
            prepend-inner-icon="mdi-city-variant-outline"
            solo
            required
          />
        </v-col>
        <v-col cols="12" md="4" sm="4">
          <v-menu
            ref="menu"
            v-model="city.cityMenu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="city.cityDateRange"
                prepend-inner-icon="mdi-calendar-text"
                label="日期"
                readonly
                solo
                v-on="on"
              />
            </template>
            <v-date-picker
              ref="picker"
              locale="zh-cn"
              v-model="city.cityDateRange"
              range
            />
          </v-menu>
        </v-col>
        <v-col cols="12" md="3" sm="3">
          <v-text-field
            v-model.number="city.costs"
            prepend-inner-icon="mdi-currency-usd"
            type="number"
            label="cost"
            solo
            required
          />
        </v-col>
        <v-col cols="12" md="2" sm="2" class="pa-1">
          <v-btn color="error" large @click="deleteRow('city', index)"
            >刪除</v-btn
          >
        </v-col>
        <!-- add touristSpots -->
        <v-row
          class="pb-0"
          v-for="(touristSpot, index2) in city.touristSpots"
          :key="index2"
          align-content-md="center"
          justify-md="center"
          dense
        >
          <v-col cols="12" md="3">
            <v-text-field
              v-model="touristSpot.name"
              prepend-inner-icon="mdi-camera-plus-outline"
              type="text"
              value="''"
              label="Touristspots"
              solo
              required
            />
          </v-col>
          <v-col cols="12" md="3">
            <v-rating
              v-model="touristSpot.rates"
              background-color="orange lighten-3"
              color="orange"
              half-increments
            ></v-rating>
          </v-col>
          <v-col cols="12" md="2">
            <v-btn color="primary" rounded>
              <v-icon>mdi-upload-multiple</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="12" md="4">
            <v-btn
              color="success"
              fab
              small
              dark
              @click="addRow('touristSpot', index)"
              ><v-icon>mdi-plus-circle-outline</v-icon>
            </v-btn>
            <v-btn
              color="error"
              fab
              small
              dark
              @click="deleteRow('touristSpot', index, index2)"
              ><v-icon>mdi-close-circle-outline</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-row>
      <v-row>
        <v-col cols="12" md="2" sm="2">
          <v-btn color="success" large @click="addRow('city')">新增城市</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-spacer />
        <v-col cols="12" sm="3">
          <v-select
            v-model="travellistPost.permissions"
            :items="permissionItems"
            item-value="value"
            label="權限"
            solo
            dense
          />
        </v-col>
        <v-col cols="12" sm="2">
          <v-btn
            color="success"
            dense
            :disabled="isDisabled"
            :loading="loading"
            @click="submitTravelListPost"
            >發佈</v-btn
          >
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
import emojiFlags from 'emoji-flags'
import Alert from '../alert'
import { _POST_TRAVELLISTPOST, POST_CITYPOST } from '@/schemas/mutaion.js'

export default {
  name: 'TravelListPostForm',
  components: {
    Alert
  },
  data: () => ({
    isFormValid: true,
    lazy: false,
    loading: false,
    cityMenu: false,
    menu: false,
    alignment: 'center',
    // travellistpost form
    travellistPost: {
      name: '',
      types: '',
      countries: [],
      review: '',
      permissions: 'PUBLIC'
    },
    travelListId: '',
    cityId: '',
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
    // country selection
    countryItems: [],
    isUpdating: false,
    // city form
    cities: [
      {
        name: '',
        cityDateRange: [],
        costs: 0,
        touristSpots: [
          {
            name: '',
            rates: 0
          }
        ]
      }
    ],
    cityCounter: 0,
    touristSpotCounter: 0,
    // alert props
    color: '',
    alertShow: false,
    alertMessage: ''
  }),
  computed: {
    dateRangeText() {
      return this.dates.join(' ~ ')
    },
    cityDateRangeText(index) {
      return this.cities[index].cityDateRange.join(' ~ ')
    },
    isDisabled() {
      const isEmpty = Object.values(this.travellistPost)
      return isEmpty.includes('')
    }
  },
  mounted() {
    this.countryInfo()
  },
  methods: {
    async submitTravelListPost() {
      this.cities.forEach(city => {
        Object.assign(city, {
          stayFrom: city.cityDateRange[0],
          stayTo: city.cityDateRange[1]
        })
        delete city['cityDateRange']
        delete city['cityMenu']
      })

      const travellist = Object.assign(this.travellistPost, {
        stayFrom: this.dates[0],
        stayTo: this.dates[1]
      })
      travellist.cities = this.cities
      console.log(travellist)
      this.loading = true
      try {
        const res = await this.$apollo.mutate({
          mutation: _POST_TRAVELLISTPOST,
          variables: {
            input: travellist
          }
        })
        const status = res.data.travelListPost.status
        switch (status) {
          case '200': {
            console.log(res.data.travelListPost)
            break
          }
          case '403': {
            this.alertShow = true
            this.color = 'warning'
            this.alertMessage = res.data.travelListPost.message
            break
          }
          case '500': {
            this.alertShow = true
            this.color = 'error'
            this.alertMessage = res.data.travelListPost.message
            break
          }
          default: {
            this.alertShow = true
            this.color = 'error'
            this.alertMessage = res.data.errors
            break
          }
        }
      } catch (err) {
        console.log(err)
        this.alertShow = true
        this.color = 'error'
        this.alertMessage = err
      }
      this.loading = false
    },
    async submitCities() {
      try {
        cities.forEach(city => {
          Object.assign(this.city, {
            stayFrom: city.cityDateRange[0],
            stayTo: city.cityDateRange[1]
          })
          delete city['cityDateRange']
        })
        const res = await this.$apollo.mutate({
          mutation: POST_CITYPOST,
          variables: cities
        })
        const status = res.data.cityPost.status
        switch (status) {
          case '200': {
            const cityId = res.data.cityPost.id
            console.log(res.data.cityPost)
            this.submitTravelSpots()
            break
          }
          case '403': {
            this.alertShow = true
            this.color = 'warning'
            this.alertMessage = res.data.cityPost.message
            break
          }
          case '500': {
            this.alertShow = true
            this.color = 'error'
            this.alertMessage = res.data.cityPost.message
            break
          }
          default: {
            this.alertShow = true
            this.color = 'error'
            this.alertMessage = res.data.errors
            break
          }
        }
      } catch (err) {
        console.log(err)
        this.alertShow = true
        this.color = 'error'
        this.alertMessage = err
      }
    },
    async submitTravelSpots() {
      try {
        cities.forEach(city => {
          Object.assign(this.city, {
            stayFrom: city.cityDateRange[0],
            stayTo: city.cityDateRange[1],
            cityId: this.travelListId
          })
          delete city['cityDateRange']
        })
        const res = await this.$apollo.mutate({
          mutation: POST_TOURISTSPOTPOST,
          variables: cities
        })
        const status = res.data.cityPost.status
        switch (status) {
          case '200': {
            console.log(res.data.cityPost)
            break
          }
          case '403': {
            this.alertShow = true
            this.color = 'warning'
            this.alertMessage = res.data.cityPost.message
            break
          }
          case '500': {
            this.alertShow = true
            this.color = 'error'
            this.alertMessage = res.data.cityPost.message
            break
          }
          default: {
            this.alertShow = true
            this.color = 'error'
            this.alertMessage = res.data.errors
            break
          }
        }
      } catch (err) {
        console.log(err)
        this.alertShow = true
        this.color = 'error'
        this.alertMessage = err
      }
    },
    closeSnackbar(close) {
      // send new status to prop
      this.alertShow = close
    },
    countryInfo() {
      this.countryItems = emojiFlags.data
    },
    remove(item) {
      const index = this.friends.indexOf(item.name)
      if (index >= 0) this.friends.splice(index, 1)
    },
    addRow(type, index) {
      switch (type) {
        case 'city': {
          this.cities.push({
            name: '',
            cityDateRange: [],
            touristSpots: [
              {
                name: '',
                rates: 0
              }
            ]
          })
          break
        }
        case 'touristSpot': {
          this.cities[index].touristSpots.push({
            name: '',
            rates: 0
          })
          break
        }
      }
    },
    deleteRow(type, index, index2) {
      switch (type) {
        case 'city': {
          if (this.cities.length > 1) {
            if (index > -1) {
              this.cities.splice(index, 1)
            }
          }
          break
        }
        case 'touristSpot': {
          if (this.cities[index].touristSpots.length > 1) {
            if (index > -1) {
              this.cities[index].touristSpots.splice(index2, 1)
            }
          }
          break
        }
      }
    },
    cityDateRangePicker(i) {
      console.log(i)
    }
  }
}
</script>
