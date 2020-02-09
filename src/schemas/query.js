import gql from 'graphql-tag'

/*
user, user profile
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
*/

export const GET_USERPROFILE = gql`
  query userProfile {
    userProfile {
      status
      message
      userProfile {
        id
        username
        email
        position
        countries
        cities
        touristSpots
        headshot
        profile
        createdAt
        updatedAt
      }
    }
  }
`

/*
Travellist, city, touristspots
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
*/

export const GET_CITIES = gql`
  query cities($id: ID!, $cursor: String!, $limit: Int!) {
    cities(id: $id, cursor: $cursor, limit: $limit) {
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

export const GET_TOURISTSPOTS = gql`
  query touristSpots($id: ID!, $cursor: String!, $limit: Int!) {
    touristSpots(id: $id, cursor: $cursor, limit: $limit) {
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
`

export const GET_TRAVELLISTS = gql`
  query travelLists($cursor: String!, $limit: Int!) {
    travelLists(cursor: $cursor, limit: $limit) {
      id
      name
      tags
      type
      stayFrom
      stayTo
      days
      costs
      rates
      likes
      comments
      permissions
      transportation
      review
      createdAt
      updatedAt
      userId
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
      }
    }
  }
`

export const GET_TRAVELLISTS_ALL = gql`
  query travelListsAll($cursor: String!, $limit: Int!) {
    travelListsAll(cursor: $cursor, limit: $limit) {
      id
      name
      tags
      type
      stayFrom
      stayTo
      days
      costs
      rates
      likes
      comments
      permissions
      transportation
      review
      createdAt
      updatedAt
      userId
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
      }
    }
  }
`

/*
post
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
*/

export const GET_POSTS = gql`
  query posts(
    $id: ID!
    $travelListId: ID!
    $type: String!
    $cursor: String!
    $limit: Int!
  ) {
    post(
      id: $id
      travelListId: $travelListId
      type: $type
      cursor: $cursor
      limit: $limit
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

/*
friendactions, likes, notifications
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
*/

export const GET_FRIENDPENDINGLIST = gql`
  query friendPendingList($cursor: String!, $limit: Int!) {
    friendPendingList(cursor: $cursor, limit: $limit) {
      status
      message
      userLists {
        id
        username
        headshot
        href
      }
    }
  }
`

export const GET_FRIENDLIST = gql`
  query friendList($cursor: String!, $limit: Int!) {
    friendList(cursor: $cursor, limit: $limit) {
      status
      message
      userLists {
        id
        username
        headshot
        href
      }
    }
  }
`

export const GET_LIKELIST = gql`
  query likeList($id: ID!, $type: String!, $cursor: String!, $limit: Int!) {
    likeList(id: $id, type: $type, cursor: $cursor, limit: $limit) {
      status
      message
      userLists {
        id
        username
        headshot
        href
      }
    }
  }
`

export const GET_NOTIFICATIONS = gql`
  query notifications($cursor: String!, $limit: Int!) {
    notifications(cursor: $cursor, limit: $limit) {
      status
      message
      notifications {
        id
        type
        href
        message
        createdAt
      }
    }
  }
`
