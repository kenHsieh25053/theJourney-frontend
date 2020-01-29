import Vue from 'vue'
import VueRouter from 'vue-router'

// pages
import MainPage from './pages/mainPage.vue'
import ContentPage from './pages/contentPage.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: MainPage
    },
    {
      path: '/content',
      name: 'Content',
      component: ContentPage
    }
  ]
})
