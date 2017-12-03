import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
} from 'graphql';
import { globalIdField } from "graphql-relay";
import {nodeInterface} from './node';

const videoType = new GraphQLObjectType({
  name: 'VideoType',
  description: 'user define video type',
  fields: {
    id: globalIdField(),
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
  interfaces: () => [nodeInterface]
});

export default videoType;