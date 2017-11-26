import { graphql, buildSchema } from "graphql";

const schema = buildSchema(`
type Query {
  foo: String
}

type Schema {
  query: Query
}
`);

const resolver = {
  foo: () => 'bar',
};

const query = `
query myFirstQuery {
  foo
}
`;

graphql(schema, query, resolver)
  .then((result) => console.log('result',result))
  .catch((err) => console.log('error', err))