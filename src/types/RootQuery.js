import sql from '../connectors'

import {
  Book
} from './'

import {
  noop
} from '../utils'

import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLString
} from 'graphql'

var debug = require('debug')('riqra-service-ads:RootQuery')

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: () => ({
    book: {
      type: new GraphQLList(Book),
      description: 'Items Sample book',
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve: async (obj, args) => {

        // evaluate args
        if (args.id !== undefined) {
          debug('args')
          debug(args)
          let idString = Buffer(args.id, 'base64').toString()
          let id = Number(idString.split(':')[1])
          debug('ITEM?', id)
          let bookItem = await sql('banner')
          .where({id: id})
          .limit(1)
          .spread(noop)
          return [bookItem]
        }

        let BooksList = await sql('banner')

        return BooksList
      }
    }
  })
})

export default RootQuery
