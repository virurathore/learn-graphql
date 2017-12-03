import express from 'express';
import graphqlHTTP from 'express-graphql';
import getVideoById from './data';

import { 
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLID,
  GraphQLList,
} from "graphql";

const PORT = process.env.PORT || 3000;
const server = express();


const videoType = new GraphQLObjectType({
  name: 'VideoType',
  description: 'user define video type',
  fields: {
    id: {
      type: GraphQLID,
      description: 'video id',
    },
    title: {
      type: GraphQLString,
      description: 'video title',
    },
    duration: {
      type: GraphQLInt,
      description: 'video duration',
    },
    watched: {
      type: GraphQLBoolean,
      description: 'video has watched',
    },
  },
});

const queryType = new GraphQLObjectType({
  name: 'QueryType',
  description: 'The root query type',
  fields: {
    video: {
      type: videoType,
      args: {
        id: {
          type: GraphQLID,
          description: 'video id which queried',
        },
      },
      resolve: (_, args) => {
        return getVideoById(args.id);
      }
    },
  }
});
const schema = new GraphQLSchema({
  query: queryType,
  // mutation,
  // subscription,
});


server.use('/gqlVideos',graphqlHTTP({
  schema, 
  graphiql: true,
  // rootValue: resolver,
}));

server.listen(PORT, () => {
  console.log(`server listening on http://localhost${PORT}`);
});