
import { nodeDefinitions, fromGlobalId } from "graphql-relay";
import videoType from './videotype';
import {getObjectById} from './data';

const idFetcher = globalId => {
  const {type, id} = fromGlobalId(globalId);
  return getObjectById(type.toLowerCase(), id);
};

const typeResolver = obj => { // replace resolveType
  if(obj.title) {
    return videoType;
  }
  return null;
}

export const {nodeInterface, nodeField} = nodeDefinitions(
  idFetcher,
  typeResolver 
);
