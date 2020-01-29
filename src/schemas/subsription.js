/* eslint-disable prettier/prettier */
import gql from 'graphql-tag'

export const SUB_FRIENDNOTIFICATIONS = gql`
  subscription friendNotifications($id: ID) {
    friendNotifications(id: $id) {
      message
      userBid
      createdAt
      userInfo
    }
  }
`

export const SUB_POSTNOTIFICATIONS = gql`
  subscription postNotifications($id: ID) {
    postNotifications(id: $id) {
      message
      userBid
      createdAt
      userInfo
    }
  }
`
