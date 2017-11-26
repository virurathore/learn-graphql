import { graphql, buildSchema } from "graphql";

const schema = buildSchema(`
type Query {
  id: ID,
  title: String,
  duration: Int,
  watched: Boolean,
}

type Schema {
  query: Query
}
`);

const resolver = {
  id: () => '1',
  title: () => 'bar',
  duration: () => 180,
  watched: () => false,
};

const query = `
query myFirstQuery {
  id,
  title,
  duration,
  watched
}
`;

graphql(schema, query, resolver)
  .then((result) => console.log('result',result))
  .catch((err) => console.log('error', err))