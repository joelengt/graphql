import RootQuery from './types'
import RootMutation from './mutations'

import {
  GraphQLSchema
} from 'graphql'

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
})

export default schema
