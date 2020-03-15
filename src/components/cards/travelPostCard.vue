<template>
  <div>
    <v-card class="mx-auto" min-width="660">
      <!-- persional information -->
      <v-card-title>
        <v-list-item class="grow">
          <v-list-item-avatar color="grey darken-3">
            <v-img
              class="elevation-6"
              src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
            ></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Evan You</v-list-item-title>
            <v-list-item-subtitle>
              newbee traveler
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              2020/02/28
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-row align="center" justify="end">
            <v-btn icon>
              <v-icon>mdi-dots-horizontal</v-icon>
            </v-btn>
          </v-row>
        </v-list-item>
      </v-card-title>
      <template>
        <v-divider></v-divider>
      </template>
      <!-- travellist post information -->
      <v-list-item class="grow">
        <v-list-item-content v-model="travelList">
          <v-list-item-title>
            <h2>{{ travelList.name }}</h2>
          </v-list-item-title>
          <v-list-item-subtitle>
            <v-chip-group>
              <v-chip class="ma-1" color="indigo" text-color="white" small>
                <v-avatar left>
                  <v-icon small>mdi-calendar-text</v-icon>
                </v-avatar>
                {{ travelList.stayFrom }} - {{ travelList.stayTo }}
              </v-chip>
              <v-chip class="ma-1" color="indigo" text-color="white" small>
                <v-avatar left>
                  <v-icon small>mdi-wallet-travel</v-icon>
                </v-avatar>
                {{ travelList.types }}
              </v-chip>
              <v-chip class="ma-1" color="indigo" text-color="white" small>
                <v-avatar left>
                  <v-icon small>mdi-airplane-takeoff</v-icon>
                </v-avatar>
                {{ travelList.days }}
              </v-chip>
              <v-chip class="ma-1" color="indigo" text-color="white" small>
                <v-avatar left>
                  <v-icon small>mdi-star-outline</v-icon>
                </v-avatar>
                {{ travelList.rates }}
              </v-chip>
              <v-chip class="ma-1" color="indigo" text-color="white" small>
                <v-avatar left>
                  <v-icon small>mdi-currency-usd</v-icon>
                </v-avatar>
                {{ travelList.costs }}
              </v-chip>
            </v-chip-group>
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            <v-chip-group>
              <v-chip
                v-for="country in travelList.countries"
                :key="country"
                small
              >
                {{ country }}
              </v-chip>
            </v-chip-group>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <!-- cities' slides -->
      <v-slide-group v-model="model" :show-arrows="true">
        <v-slide-item
          v-for="city in cities"
          :key="city"
          v-slot:default="{ active, toggle }"
        >
          <v-card
            :color="active ? '#EEEEEE' : 'grey lighten-1'"
            class="ma-4"
            height="200"
            width="200"
            @click="toggle"
          >
            <v-img height="100%" src="../../assets/citySlide.png">
              <v-row
                class="fill-height white--text"
                align="center"
                justify="center"
              >
                <v-card-title v-text="city" v-show="isShow"></v-card-title>
                <v-scale-transition>
                  <v-icon
                    v-if="active"
                    color="white"
                    size="48"
                    v-text="'mdi-close-circle-outline'"
                  ></v-icon>
                </v-scale-transition>
              </v-row>
            </v-img>
          </v-card>
        </v-slide-item>
      </v-slide-group>
      <!-- city's touristspots informaiton -->
      <v-expand-transition>
        <v-sheet v-if="model != null" tile>
          <v-row>
            <v-col cols="12">
              <v-img
                class="white--text align-end fill-width"
                height="200"
                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
              >
                <v-card-title>Selected {{ model }}</v-card-title>
              </v-img>
            </v-col>
          </v-row>
          <!-- touristspot list -->
          <v-row>
            <v-col cols="12">
              <v-list-item class="grow">
                <v-list-item-content>
                  <v-list-item-title>
                    <h2>London</h2>
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    <v-chip-group>
                      <v-chip
                        class="ma-1"
                        color="indigo"
                        text-color="white"
                        small
                      >
                        <v-avatar left>
                          <v-icon small>mdi-calendar-text</v-icon>
                        </v-avatar>
                        2020/09/11-2020/09/19
                      </v-chip>
                      <v-chip
                        class="ma-1"
                        color="indigo"
                        text-color="white"
                        small
                      >
                        <v-avatar left>
                          <v-icon small>mdi-airplane-takeoff</v-icon>
                        </v-avatar>
                        28
                      </v-chip>
                      <v-chip
                        class="ma-1"
                        color="indigo"
                        text-color="white"
                        small
                      >
                        <v-avatar left>
                          <v-icon small>mdi-star-outline</v-icon>
                        </v-avatar>
                        4.5
                      </v-chip>
                      <v-chip
                        class="ma-1"
                        color="indigo"
                        text-color="white"
                        small
                      >
                        <v-avatar left>
                          <v-icon small>mdi-currency-usd</v-icon>
                        </v-avatar>
                        18900
                      </v-chip>
                    </v-chip-group>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>
          <!-- touristspot detail and image slide -->
          <v-row>
            <v-col cols="12">
              <v-list>
                <v-list-group
                  v-for="item in touristspots"
                  :key="item.title"
                  no-action
                >
                  <template v-slot:activator>
                    <v-list-item-content>
                      <v-list-item-title v-text="item.title">
                      </v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-content>
                      <v-rating
                        v-model="item.rates"
                        color="yellow darken-3"
                        background-color="grey darken-1"
                        empty-icon="$ratingFull"
                        half-increments
                        hover
                        readonly
                      ></v-rating>
                    </v-list-item-content>
                  </template>
                  <v-list-item @click="">
                    <v-slide-group
                      v-model="touristSpotModel"
                      class="pa-4"
                      active-class="success"
                      show-arrows
                    >
                      <v-slide-item
                        v-for="(images, index) in item.items"
                        :key="index"
                        v-slot:default="{ active, toggle }"
                      >
                        <v-card
                          :color="active ? undefined : 'grey lighten-1'"
                          class="ma-4"
                          height="200"
                          width="200"
                          @click="toggle"
                        >
                          <!-- need to change src -->
                          <v-img
                            height="200"
                            width="200"
                            :src="require(`../../assets/${images}`)"
                            @click="openImage(images)"
                          >
                            <template v-slot:placeholder>
                              <v-row
                                class="fill-height ma-0"
                                align="center"
                                justify="center"
                              >
                                <v-progress-circular
                                  indeterminate
                                  color="grey lighten-5"
                                ></v-progress-circular>
                              </v-row>
                            </template>
                          </v-img>
                          <v-row
                            class="fill-height"
                            align="center"
                            justify="center"
                          >
                            <v-scale-transition>
                              <v-icon
                                v-if="active"
                                color="white"
                                size="48"
                                v-text="'mdi-close-circle-outline'"
                              ></v-icon>
                            </v-scale-transition>
                          </v-row>
                        </v-card>
                      </v-slide-item>
                    </v-slide-group>
                  </v-list-item>
                </v-list-group>
              </v-list>
            </v-col>
          </v-row>
        </v-sheet>
      </v-expand-transition>
      <!-- travel post review -->
      <v-card-title>Review</v-card-title>
      <v-card-text class="text--primary">
        <p>
          "At vero eos et accusamus et iusto odio dignissimos ducimus qui
          blanditiis praesentium voluptatum deleniti atque corrupti quos dolores
          et quas molestias excepturi sint occaecati cupiditate non provident,
          similique sunt in culpa qui officia deserunt mollitia animi, id est
          laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita
          distinctio. Nam libero tempore, cum soluta nobis est eligendi optio
        </p>
      </v-card-text>
      <!-- like/comment/shart statistic -->
      <v-card-actions>
        <v-btn-toggle borderless>
          <v-btn text small>
            <v-icon left>mdi-thumb-up-outline</v-icon>
            <span class="hidden-sm-and-down">234</span>
          </v-btn>
          <v-btn text small>
            <v-icon left>mdi-comment-text-multiple-outline</v-icon>
            <span class="hidden-sm-and-down">23</span>
          </v-btn>
          <v-btn text small>
            <v-icon left>mdi-share-outline</v-icon>
            <span class="hidden-sm-and-down">5</span>
          </v-btn>
        </v-btn-toggle>
      </v-card-actions>
      <template>
        <v-divider></v-divider>
      </template>
      <!-- user like/comment/share post -->
      <v-card-actions>
        <v-btn-toggle borderless>
          <v-btn text>
            <v-icon left>mdi-thumb-up-outline</v-icon>
            <span class="hidden-sm-and-down">Likes</span>
          </v-btn>
          <v-btn text>
            <v-icon left>mdi-comment-text-multiple-outline</v-icon>
            <span class="hidden-sm-and-down">Comments</span>
          </v-btn>
          <v-btn text>
            <v-icon left>mdi-share-outline</v-icon>
            <span class="hidden-sm-and-down">Share</span>
          </v-btn>
        </v-btn-toggle>
      </v-card-actions>
    </v-card>
    <!-- image dialog -->
    <v-dialog v-model="dialog" max-width="700px">
      <v-card>
        <v-img :src="imagesPath">
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-img>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
// import FullImageCard from './fullImageCard.vue'
export default {
  // components: {
  //   FullImageCard
  // },
  name: 'TravelPostCard',
  data() {
    return {
      isShow: true,
      model: null,
      touristSpotModel: null,
      dialog: false,
      cities: ['London', 'New York', 'Taipei', 'Tokyo', 'Hong Kong'],
      items: [
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'aaaaa',
          rates: 4,
          items: ['../../assets/citySlide.png']
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'bbbbb',
          rates: 3,
          items: ['../../assets/citySlide.png']
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'ccccc',
          rates: 4,
          items: ['../../assets/citySlide.png']
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          title: 'ddddd',
          rates: 5,
          items: ['../../assets/citySlide.png']
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          title: 'eeeee',
          rates: 3,
          items: ['../../assets/citySlide.png']
        }
      ],
      touristspots: [
        {
          action: 'local_activity',
          title: 'Attractions',
          rates: 3,
          items: [
            'ts_original.jpg',
            'ts_original.jpg',
            'ts_original.jpg',
            'ts_original.jpg'
          ]
        },
        {
          action: 'restaurant',
          title: 'Dining',
          rates: 3,
          items: [
            'ts_original.jpg',
            'ts_original.jpg',
            'ts_original.jpg',
            'ts_original.jpg'
          ]
        },
        {
          action: 'school',
          title: 'Education',
          rates: 3,
          items: [
            'ts_original.jpg',
            'ts_original.jpg',
            'ts_original.jpg',
            'ts_original.jpg'
          ]
        },
        {
          action: 'directions_run',
          title: 'Family',
          rates: 3,
          items: [
            'ts_original.jpg',
            'ts_original.jpg',
            'ts_original.jpg',
            'ts_original.jpg'
          ]
        },
        {
          action: 'healing',
          title: 'Health',
          rates: 3,
          items: [
            'ts_original.jpg',
            'ts_original.jpg',
            'ts_original.jpg',
            'ts_original.jpg'
          ]
        },
        {
          action: 'content_cut',
          title: 'Office',
          rates: 3,
          items: [
            'ts_original.jpg',
            'ts_original.jpg',
            'ts_original.jpg',
            'ts_original.jpg'
          ]
        },
        {
          action: 'local_offer',
          title: 'Promotions',
          rates: 3,
          items: [
            'ts_original.jpg',
            'ts_original.jpg',
            'ts_original.jpg',
            'ts_original.jpg'
          ]
        }
      ],
      imagesPath: '',
      travelList: {
        name: 'Europe 28 days',
        types: 'BACKPACK',
        stayFrom: '2019-10-10 ',
        stayTo: '2019-11-07 ',
        days: 28,
        costs: 140000,
        rates: 4.5,
        likes: 67,
        comments: 6,
        reviews: '',
        countries: ['thailand', 'hong kong', 'china', 'taiwan'],
        createdAt: '2019-11-09 00:00:00'
      }
    }
  },
  methods: {
    openImage(images) {
      this.imagesPath = require(`../../assets/${images}`)
      this.dialog = !this.dialog
    }
  }
}
</script>
