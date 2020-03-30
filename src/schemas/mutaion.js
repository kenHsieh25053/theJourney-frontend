import gql from 'graphql-tag'

/*
user, user profile
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
*/

export const USER_LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      status
      message
      id_token
    }
  }
`

export const USER_SIGNUP = gql`
  mutation signup($email: String!, $username: String!, $password: String!) {
    signup(email: $email, username: $username, password: $password) {
      status
      message
    }
  }
`

export const POST_USERPROFILE = gql`
  mutation userProfilePost(
    $username: String!
    $email: String!
    $profile: String
  ) {
    userProfilePost(username: $username, email: $email, profile: $profile) {
      status
      message
      userProfile {
        id
        username
        password
        email
        position
        countries
        cities
        headshot
        profile
        createdAt
        updatedAt
      }
    }
  }
`

export const POST_USERDELETE = gql`
  mutation userDelete {
    userDelete {
      status
      message
    }
  }
`

/*
Travellist, city, touristspots
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
*/

export const POST_TRAVELLISTPOST = gql`
  mutation travelListPost($input: TravelListPostInput!) {
    travelListPost(input: $input) {
      status
      message
      travelLists {
        id
        name
        tags
        types
        stayFrom
        stayTo
        days
        costs
        rates
        likes
        comments
        transportation
        review
        countries
        permissions
        createdAt
        updatedAt
        userId
        cities {
          id
          name
          longitude
          latitude
          stayFrom
          stayTo
          costs
          rates
          transportation
          review
          photo_url
          createdAt
          updatedAt
          travelListId
          touristSpots {
            id
            name
            type
            longitude
            latitude
            days
            costs
            rates
            transportation
            review
            photo_url
            createdAt
            updatedAt
            cityId
          }
        }
      }
    }
  }
`

export const POST_TRAVELLISTDELETE = gql`
  mutation travelListDelete($id: ID!) {
    travelListDelete(id: $id) {
      status
      message
    }
  }
`
export const POST_CITYPOST = gql`
  mutation cityPost(
    $id: ID
    $name: String!
    $stayFrom: String!
    $stayTo: String!
    $transportation: String
    $review: String
    $travelListId: ID!
  ) {
    cityPost(
      id: $id
      name: $name
      stayFrom: $stayFrom
      stayTo: $stayTo
      transportation: $transportation
      review: $review
      travelListId: $travelListId
    ) {
      status
      message
      cities {
        id
        name
        longtitude
        latitude
        stayFrom
        stayTo
        costs
        rates
        transportation
        review
        photo_url
        createdAt
        updatedAt
        travelListId
        touristSpots {
          id
          name
          type
          longtitude
          latitude
          days
          costs
          rates
          transportation
          review
          photo_url
          createdAt
          updatedAt
          cityId
        }
      }
    }
  }
`

export const POST_CITYDELETE = gql`
  mutation cityDelete($id: ID!) {
    cityDelete(id: $id) {
      status
      message
    }
  }
`

export const POST_TOURISTSPOTPOST = gql`
  mutation touristSpotPost(
    $id: ID
    $name: String!
    $type: String!
    $days: Int!
    $cost: Int!
    $rates: Float!
    $transportation: String
    $review: String
    $cityId: ID!
  ) {
    touristSpotPost(
      id: $id
      name: $name
      type: $type
      days: $days
      cost: $cost
      rates: $rates
      transportation: $transportation
      review: $review
      cityId: $cityId
    ) {
      status
      message
      touristSpot {
        id
        name
        type
        longtitude
        latitude
        days
        costs
        rates
        transportation
        review
        photo_url
        createdAt
        updatedAt
        cityId
      }
    }
  }
`

export const POST_TOURISTSPOTDELETE = gql`
  mutation touristSpot($id: ID!) {
    touristSpot(id: $id) {
      status
      message
    }
  }
`

/*
post
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
*/

export const POST_POSTADDORUPDATE = gql`
  mutation postAddorUpdate(
    $id: ID
    $travelListId: ID!
    $text: String!
    $type: String!
  ) {
    postAddorUpdate(
      id: $id
      travelListId: $travelListId
      text: $text
      type: $type
    ) {
      status
      message
      posts {
        id
        text
        likes
        createdAt
        updatedAt
        userId
        parentId
      }
    }
  }
`

export const POST_POSTDELETE = gql`
  mutation postDelete($id: ID!) {
    postDelete(id: $id) {
      status
      message
    }
  }
`

/*
friendactions, likes
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
*/

export const POST_FRIENDACTIONS = gql`
  mutation friendActions($user_b: ID, $status: String!) {
    friendActions(user_b: $user_b, status: $status) {
      status
      message
    }
  }
`

export const POST_LIKE = gql`
  mutation like($id: ID!, $authorId: ID!, $type: String!) {
    like(id: $id, authorId: $authorId, type: $type) {
      status
      message
      likes {
        id
        liked
      }
    }
  }
`
