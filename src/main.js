import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'

import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { setContext } from 'apollo-link-context'
// import { onError } from 'apollo-link-error'
import VueApollo from 'vue-apollo'
import Vuex from 'vuex'
import router from './router'

const httpLink = new HttpLink({
  // URL to graphql server, you should use an absolute URL here
  uri: 'http://localhost:4000/graphql'
})

// Create the subscription websocket link
const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/graphql',
  options: {
    reconnect: true
  }
})

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink
)

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token')
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

// create the apollo client
const apolloClient = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache(),
  connectToDevTools: true,
  defaultOptions: {
    // apollo options applied to all queries in components
    $query: {
      loadingKey: 'loading',
      fetchPolicy: 'cache-and-network'
    },
    // Enable Automatic Query persisting with Apollo Engine
    persisting: true
  }
  // fetchOptions: {
  //   mode: 'no-cors'
  // }
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
  errorHandler(error) {
    console.log(
      '%cError',
      'background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;',
      error.message
    )
  }
})

// install the vue plugin
Vue.use(VueApollo)
Vue.use(Vuex)
Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  apolloProvider,
  render: h => h(App)
}).$mount('#app')
