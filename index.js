import { graphql, buildSchema } from "graphql";

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

const query = `
query myFirstQuery {
  videos {
    id,
    title,
    duration,
    watched,
  },
}
`;

graphql(schema, query, resolver)
  .then((result) => console.log('result',result))
  .catch((err) => console.log('error', err))