<template>
  <div class="text-center">
    <v-snackbar v-model="alertShow" :color="color" :top="true">
      {{ alertMessage }}
      <v-btn dark text @click="closeSnackbar">
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: 'Arert',
  props: {
    alertShow: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: 'yellow'
    },
    alertMessage: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      snackbar: this.alertShow
    }
  },
  watch: {
    alertShow(val) {
      this.snackbar = val
    }
  },
  methods: {
    closeSnackbar() {
      this.snackbar = false
      // tell the parent component
      this.$emit('alertShow', false)
    }
  }
}
</script>
