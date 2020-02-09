<template>
  <v-form ref="form" v-model="isFormValid">
    <v-container>
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
      <v-row>
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
      <v-row v-for="(city, index) in cities" :key="index">
        <v-layout align="center" justify="center">
          <v-col cols="12" md="3" sm="3">
            <v-text-field
              v-model="city.cityName"
              type="text"
              label="城市名稱"
              prepend-inner-icon="mdi-map"
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
                  v-model="city.cityDates"
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
                v-model="city.cityDates"
                range
              />
            </v-menu>
          </v-col>
          <v-col cols="12" md="3" sm="3">
            <v-text-field
              v-model="city.touristSpots"
              prepend-inner-icon="mdi-calendar-text"
              type="text"
              value="''"
              label="景點名稱"
              solo
              required
            />
          </v-col>
          <v-col cols="12" md="2" sm="2">
            <v-btn color="error" large @click="deleteRow">刪除</v-btn>
          </v-col>
        </v-layout>
      </v-row>
      <v-row>
        <v-col cols="12" md="2" sm="2">
          <v-btn color="success" large @click="addRow">新增城市</v-btn>
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
            @click="submit"
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
import { POST_TRAVELLISTPOST, POST_CITYPOST } from '@/schemas/mutaion.js'

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
      id: null,
      name: '',
      types: '',
      countries: [],
      review: '',
      permissions: 'PUBLIC'
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
    // country selection
    countryItems: [],
    isUpdating: false,
    // city form
    cities: [
      {
        cityName: '',
        cityDates: [],
        touristSpots: []
      }
    ],
    cityCounter: 0,
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
      return this.cities[index].cityDates.join(' ~ ')
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
    async submit() {
      const travellist = Object.assign(this.travellistPost, {
        stayFrom: this.dates[0],
        stayTo: this.dates[1]
      })
      this.loading = true
      try {
        const res = await this.$apollo.mutate({
          mutation: POST_TRAVELLISTPOST,
          variables: travellist
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
        const res = await this.$apollo.mutate({
          mutation: POST_CITYPOST,
          variables: travellist
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
    addRow() {
      this.cityCounter += 1
      this.cities.push({
        cityName: '',
        cityDates: [],
        touristSpots: []
      })
    },
    deleteRow() {
      if (this.cities.length > 1) {
        this.cities.pop()
      }
    },
    cityDateRangePicker(i) {
      console.log(i)
    }
  }
}
</script>
