import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'mdi' // default - only for display purposes
  },
  theme: {
    themes: {
      light: {
        background: colors.indigo.lighten5 // Not automatically applied
      }
    }
  }
})
