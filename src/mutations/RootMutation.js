import {
  GraphQLObjectType
} from 'graphql/type'

import Book from './Book'

const RootMutation = new GraphQLObjectType({
  name: 'RootMutation',
  fields: {
    ...Book
  }
})

export default RootMutation
