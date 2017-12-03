import {
  GraphQLInterfaceType,
  GraphQLNonNull,
  GraphQLID,
} from 'graphql';
import videoType from './videotype';

const nodeInterface = new GraphQLInterfaceType({
  name: 'Node',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    }
  },
  resolveType: (object) => {
    if(object.title) {
      return videoType;
    }
    return null;
  }
});

export { nodeInterface };