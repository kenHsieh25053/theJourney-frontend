<template>
  <v-card class="mx-auto" min-width="660">
    <v-card-actions>
      <v-card-title>
        開始記錄你的每段旅程吧！
      </v-card-title>
      <v-spacer />
      <v-btn icon @click="show = !show">
        <v-icon>mdi-square-edit-outline</v-icon>
      </v-btn>
    </v-card-actions>
    <v-expand-transition>
      <div v-show="show">
        <v-divider />
        <travel-post-form />
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
import TravelPostForm from '../forms/travelPostForm'
export default {
  name: 'AddTravelPostCard',
  components: {
    TravelPostForm
  },
  data() {
    return {
      show: false
    }
  }
}
</script>
