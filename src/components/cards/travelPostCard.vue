<template>
  <v-card class="mx-auto" min-width="660">
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
    <v-list-item class="grow">
      <v-list-item-content>
        <v-list-item-title>
          <h2>Europe 28 days</h2>
        </v-list-item-title>
        <v-list-item-subtitle>
          <v-row dense no-gutters>
            <v-col cols="12">
              <v-chip-group>
                <v-chip class="ma-1" color="indigo" text-color="white" small>
                  <v-avatar left>
                    <v-icon small>mdi-calendar-text</v-icon>
                  </v-avatar>
                  2020/09/11-2020/09/19
                </v-chip>
                <v-chip class="ma-1" color="indigo" text-color="white" small>
                  <v-avatar left>
                    <v-icon small>mdi-airplane-takeoff</v-icon>
                  </v-avatar>
                  28
                </v-chip>
                <v-chip class="ma-1" color="indigo" text-color="white" small>
                  <v-avatar left>
                    <v-icon small>mdi-star-outline</v-icon>
                  </v-avatar>
                  4.5
                </v-chip>
                <v-chip class="ma-1" color="indigo" text-color="white" small>
                  <v-avatar left>
                    <v-icon small>mdi-currency-usd</v-icon>
                  </v-avatar>
                  18900
                </v-chip>
              </v-chip-group>
            </v-col>
          </v-row>
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-img
      class="white--text align-end"
      height="200px"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
    >
      <v-card-title>Top 10 Australian beaches</v-card-title>
    </v-img>

    <v-card-title>Review</v-card-title>
    <v-card-text class="text--primary">
      <p>
        "At vero eos et accusamus et iusto odio dignissimos ducimus qui
        blanditiis praesentium voluptatum deleniti atque corrupti quos dolores
        et quas molestias excepturi sint occaecati cupiditate non provident,
        similique sunt in culpa qui officia deserunt mollitia animi, id est
        laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita
        distinctio. Nam libero tempore, cum soluta nobis est eligendi optio
        cumque nihil impedit quo minus id quod maxime placeat facere possimus,
        omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem
        quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet
        ut et voluptates repudiandae sint et molestiae non recusandae. Itaque
        earum rerum hic tenetur a sapiente delectus, ut aut reiciendis
        voluptatibus maiores alias consequatur aut perferendis doloribus
        asperiores repellat."
      </p>
    </v-card-text>
    <v-card-actions>
      <v-btn-toggle v-model="icon" borderless>
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
    <v-card-actions>
      <v-btn-toggle v-model="icon" borderless>
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
</template>

<script>
export default {
  name: 'TravelPostCard'
}
</script>
