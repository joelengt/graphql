import {
  idField
} from '../utils'

import {
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLObjectType
} from 'graphql'

import { NodeInterface } from './Node'

export const Book = new GraphQLObjectType({
  name: 'Book',
  interfaces: [NodeInterface],
  description: 'Items Sample book',
  fields: {
    ...idField,
    name: {
      type: GraphQLString
    },
    author: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    },
    editorial: {
      type: GraphQLString
    },
    release: {
      type: GraphQLInt
    },
    is_archivated: {
      type: GraphQLBoolean,
      resolve: () => {
        return false
      }
    }
  }
})
