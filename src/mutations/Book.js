import sql from '../connectors/sql'

import {
  noop
} from '../utils'

import {
  mutationWithClientMutationId
} from 'graphql-relay'

import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList
} from 'graphql'

import {
  Book
} from '../types'

import _ from 'lodash'

var debug = require('debug')('riqra-service-ads:mutation-book')

const createBook = mutationWithClientMutationId({
  name: 'createBook',
  inputFields: {
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    author: {
      type: new GraphQLNonNull(GraphQLString)
    },
    description: {
      type: new GraphQLNonNull(GraphQLString)
    },
    editorial: {
      type: new GraphQLNonNull(GraphQLString)
    },
    release: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    is_archivated: {
      type: GraphQLBoolean
    }
  },
  outputFields: {
    created_book_id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    book: {
      type: Book
    }
  },
  mutateAndGetPayload: async (args, ctx, info) => {
    args.name = args.name + '!!'

    let id = await sql('banner')
    .insert(args)
    .spread(noop)

    let bookItem = await sql('banner')
    .where({id: id})
    .limit(1)
    .spread(noop)

    debug('Data book item')
    debug(bookItem)

    return {
      created_book_id: id,
      book: bookItem
    }
  }
})

const updateBook = mutationWithClientMutationId({
  name: 'updateBook',
  inputFields: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    author: {
      type: new GraphQLNonNull(GraphQLString)
    },
    description: {
      type: new GraphQLNonNull(GraphQLString)
    },
    editorial: {
      type: new GraphQLNonNull(GraphQLString)
    },
    release: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    is_archivated: {
      type: GraphQLBoolean
    }
  },
  outputFields: {
    updated_book_id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    book: {
      type: Book
    }
  },
  mutateAndGetPayload: async (args, ctx, info) => {
    args.name = args.name + '???!!'

    let id = args.id
    await sql('banner')
    .update(args)
    .limit(1)
    .where({id})

    let book = await sql('banner')
    .where({id})
    .limit(1)
    .spread(noop)

    return { updated_book_id: id, book }
  }
})

const deleteBook = mutationWithClientMutationId({
  name: 'deleteBook',
  inputFields: {
    ids: {
      type: new GraphQLList(GraphQLID)
    }
  },
  outputFields: {
    deleted_book_id: {
      type: new GraphQLList(GraphQLID)
    }
  },
  mutateAndGetPayload: async (args, ctx, info) => {
    let promises = []
    let ids = args.ids

    _.each(ids, id => {
      promises.push(
        sql('banner')
        .where({id})
        .del()
      )
    })

    await Promise.all(promises)

    return {deleted_book_id: ids}
  }
})

export default {
  createBook,
  updateBook,
  deleteBook
}
