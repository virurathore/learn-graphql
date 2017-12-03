# learn-graphql
##v01
  basic graphql
##v02
  grpahql schema
##v03
  data type and collection in graphql schema.

npm install --save express express-graphql 
#v04
  setup graphql server using express
  running on
  http://localhost:3000/gqlVideos
```
import express from 'express';
import graphqlHTTP from 'express-graphql';
const PORT = process.env.PORT || 3000;
const server = express();
server.use('/gqlVideos',graphqlHTTP({
  schema, 
  graphiql: true,
  rootValue: resolver,
}));

server.listen(PORT, () => {
  console.log(`server listening on http://localhost${PORT}`);
});
```
query to run in graphiql editor
{
  videos {
    id,
    title
  }
}
