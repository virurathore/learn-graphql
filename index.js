import express from 'express';
import graphqlHTTP from 'express-graphql';
import { getVideoById, getVideos, createVideo } from './data';

import { 
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
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
          type: new GraphQLNonNull(GraphQLID),
          description: 'video id which queried',
        },
      },
      resolve: (_, args) => {
        return getVideoById(args.id);
      }
    },
    videos: {
      type: new GraphQLList(videoType),
      resolve: getVideos,
    }
  }
});
const mutaionType = new GraphQLObjectType({
  name: "mutation",
  description: 'The root mutation',
  fields: {
    createVideo: {
      type: videoType,
      args: {
        title: {
          type: GraphQLString,
          description: 'video title',
        },
        duration: {
          type: GraphQLInt,
          description: 'video duration',
        },
        released: {
          type: GraphQLBoolean,
          description: 'is this video released or not',
        },
      },
      resolve: (_, args) => createVideo(args),
    },
  },
});
const schema = new GraphQLSchema({
  query: queryType,
  mutation: mutaionType,
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