<template>
  <div>
    <content-nav-bar />
    <v-container fluid>
      <v-row>
        <v-col cols="12" sm="8" md="8">
          <v-col cols="12">
            <add-travel-post-card />
          </v-col>
          <v-col cols="12">
            <div class="flex-no-wrap justify-space-between">
              <travel-post-card />
            </div>
          </v-col>
        </v-col>
        <v-col cols="12" sm="4" md="4">
          <v-col cols="12">
            <personal-info-card />
          </v-col>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ContentNavBar from '../components/navBars/contentNavBar'
import PersonalInfoCard from '../components/cards/personalInfoCard.vue'
import TravelPostCard from '../components/cards/travelPostCard.vue'
import AddTravelPostCard from '../components/cards/addTravelPostCard.vue'
export default {
  name: 'ContentPage',
  components: {
    ContentNavBar,
    PersonalInfoCard,
    TravelPostCard,
    AddTravelPostCard
  }
}
</script>
