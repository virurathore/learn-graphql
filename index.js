import express from 'express';
import graphqlHTTP from 'express-graphql';

import { graphql, buildSchema } from "graphql";

const PORT = process.env.PORT || 3000;
const server = express();

const schema = buildSchema(`
type Video {
  id: ID,
  title: String,
  duration: Int,
  watched: Boolean,
}
type Query {
  video: Video,
  videos: [Video],
}

type Schema {
  query: Query
}
`);
const videoA = {
  id: '1',
  title: 'bar',
  duration: 180,
  watched: false,
};
const videoB = {
  id: '2',
  title: 'foo',
  duration: 200,
  watched: true,
};
const videos = [videoA, videoB];

const resolver = {
  video: () => ({
    id: '2',
    title: 'foo',
    duration: 200,
    watched: true,
  }),
  videos: () => videos,
};


server.use('/gqlVideos',graphqlHTTP({
  schema, 
  graphiql: true,
  rootValue: resolver,
}));

server.listen(PORT, () => {
  console.log(`server listening on http://localhost${PORT}`);
});