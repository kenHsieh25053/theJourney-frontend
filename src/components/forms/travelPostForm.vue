<template>
  <v-form ref="form" v-model="isFormValid">
    <v-container fill-height>
      <!-- add travellist -->
      <v-row>
        <v-col cols="12" md="3">
          <v-text-field
            v-model="travellistPost.name"
            type="text"
            label="行程名稱"
            prepend-inner-icon="mdi-map"
            solo
            required
          />
        </v-col>
        <v-col cols="12" md="3">
          <v-select
            v-model="travellistPost.types"
            :items="typeItems"
            item-value="value"
            label="旅遊類型"
            prepend-inner-icon="mdi-wallet-travel"
            solo
          />
        </v-col>
        <v-col cols="12" md="3">
          <v-menu
            v-model="start_date_menu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="travellistPost.stayFrom"
                label="From"
                prepend-inner-icon="mdi-calendar-text"
                readonly
                v-on="on"
                solo
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="travellistPost.stayFrom"
              @input="start_date_menu = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" md="3">
          <v-menu
            v-model="end_date_menu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="travellistPost.stayTo"
                label="To"
                prepend-inner-icon="mdi-calendar-text"
                :allowed-dates="allowedDates"
                readonly
                v-on="on"
                solo
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="travellistPost.stayTo"
              @input="end_date_menu = false"
            ></v-date-picker>
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
      <v-row v-for="(city, index) in cities" :key="index">
        <v-col cols="12">
          <v-toolbar dense>
            <v-toolbar-items>
              <v-text-field
                v-model="city.name"
                type="text"
                label="城市名稱"
                prepend-inner-icon="mdi-city-variant-outline"
                solo
                flat
                required
              />
            </v-toolbar-items>
            <v-toolbar-items>
              <v-menu
                v-model="city.start_date_menu_city"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="city.stayFrom"
                    label="From"
                    prepend-inner-icon="mdi-calendar-text"
                    readonly
                    v-on="on"
                    solo
                    flat
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="city.stayFrom"
                  @input="start_date_menu = false"
                ></v-date-picker>
              </v-menu>
            </v-toolbar-items>
            <v-toolbar-items>
              <v-menu
                v-model="city.end_date_menu_city"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="city.stayTo"
                    label="To"
                    prepend-inner-icon="mdi-calendar-text"
                    readonly
                    v-on="on"
                    solo
                    flat
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="city.stayTo"
                  @input="end_date_menu = false"
                ></v-date-picker>
              </v-menu>
            </v-toolbar-items>
            <v-toolbar-items>
              <v-text-field
                v-model.number="city.costs"
                prepend-inner-icon="mdi-currency-usd"
                type="number"
                label="cost"
                solo
                flat
                required
              />
            </v-toolbar-items>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn color="error" @click="deleteRow('city', index)" text>
                <v-icon>mdi-close-circle-outline</v-icon>
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
        </v-col>
        <!-- add touristSpots -->
        <v-container>
          <v-row
            v-for="(touristSpot, index2) in city.touristSpots"
            :key="index2"
            align-content-md="center"
            justify-md="center"
          >
            <v-col cols="12">
              <v-toolbar dense>
                <v-toolbar-items>
                  <v-btn
                    color="success"
                    fab
                    small
                    dark
                    text
                    @click="addRow('touristSpot', index)"
                    ><v-icon>mdi-plus-circle-outline</v-icon>
                  </v-btn>
                </v-toolbar-items>
                <v-toolbar-items>
                  <v-text-field
                    v-model="touristSpot.name"
                    prepend-inner-icon="mdi-camera-plus-outline"
                    type="text"
                    value="''"
                    label="景點"
                    solo
                    flat
                    required
                  />
                </v-toolbar-items>
                <v-toolbar-items>
                  <v-rating
                    v-model="touristSpot.rates"
                    background-color="orange lighten-3"
                    color="orange"
                    half-increments
                  ></v-rating>
                </v-toolbar-items>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                  <v-btn color="primary" text>
                    <v-icon>mdi-upload-multiple</v-icon>
                  </v-btn>
                </v-toolbar-items>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                  <v-btn
                    color="error"
                    fab
                    small
                    dark
                    text
                    @click="deleteRow('touristSpot', index, index2)"
                    ><v-icon>mdi-close-circle-outline</v-icon>
                  </v-btn>
                </v-toolbar-items>
              </v-toolbar>
            </v-col>
          </v-row>
        </v-container>
      </v-row>
      <v-row>
        <v-col cols="12" md="2" sm="2">
          <v-btn color="success" @click="addRow('city')" dense>新增城市</v-btn>
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
import { POST_TRAVELLISTPOST } from '@/schemas/mutaion.js'

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
      id: '',
      name: '',
      types: '',
      stayFrom: new Date().toISOString().substr(0, 10),
      stayTo: new Date().toISOString().substr(0, 10),
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
    start_date_menu: false,
    end_date_menu: false,
    datesTo: [],
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
        id: '',
        name: '',
        stayFrom: new Date().toISOString().substr(0, 10),
        stayTo: new Date().toISOString().substr(0, 10),
        costs: 0,
        travelListId: '',
        start_date_menu_city: false,
        end_date_menu_city: false,
        touristSpots: [
          {
            id: '',
            name: '',
            rates: 0,
            photo_url: '',
            cityId: ''
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
        delete city.start_date_menu_city
        delete city.end_date_menu_city
      })
      this.travellistPost.cities = this.cities
      console.log(this.travellistPost)
      this.loading = true
      try {
        const res = await this.$apollo.mutate({
          mutation: POST_TRAVELLISTPOST,
          variables: {
            input: this.travellistPost
          }
        })
        const status = res.data.travelListPost.status
        switch (status) {
          case '200': {
            console.log('from backend')
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
    closeSnackbar(close) {
      // send new status to prop
      this.alertShow = close
    },
    countryInfo() {
      this.countryItems = emojiFlags.data
    },
    remove(item) {
      const index = this.travellistPost.countries.indexOf(item.name)
      if (index >= 0) this.travellistPost.countries.splice(index, 1)
    },
    addRow(type, index) {
      switch (type) {
        case 'city': {
          this.cities.push({
            id: '',
            name: '',
            touristSpots: [
              {
                id: '',
                name: '',
                rates: 0
              }
            ]
          })
          break
        }
        case 'touristSpot': {
          this.cities[index].touristSpots.push({
            id: '',
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
    allowedDates(val) {
      // val > from
      // console.log(val.travellistPost.stayFrom)
      // const from = parseInt(val.travellistPost.stayFrom.split('-').join(''))

      // console.log(parseInt(val.travellistPost.stayFrom.split('-').join('')))
      return val.travellistPost.stayFrom
    }
  }
}
</script>
