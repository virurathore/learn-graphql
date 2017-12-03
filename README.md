# learn-graphql

## v01
  basic graphql
## v02
  grpahql schema
## v03
  data type and collection in graphql schema.

npm install --save express express-graphql 
## v04
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
## v05
  using GraphQLTypes to build schema
```
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
      resolve: () => new Promise((resolve) => {
        resolve({
          id: '1',
          title: 'foo',
          duration: 180,
          watched: true,
        });
      }),
    },
    videos: {
      type: new GraphQLList(videoType),
      resolve: () => new Promise((resolve) => {
        resolve(videos);
      })
    },
  }
});
const schema = new GraphQLSchema({
  query: queryType,
  // mutation,
  // subscription,
});

```  
## v06
  add argument to graphql query
```
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
``` 
resolve query data 
```
const videos = [videoA, videoB];
const getVideoById = (id) => new Promise((resolve) => {
  const [video] = videos.filter(video => (video.id === id));
  resolve(video);
});
```

## v07
add GraphQLNonNull to argument, this argument can't be null.
```
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'video id which queried',
    },
  },
```

## v08
use GraphQLList to get all data
```
  fields: {
    videos: {
      type: new GraphQLList(videoType),
      resolve: getVideos,
    }
  }
```

## v09
creating mutation type
```
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
```
running mutation in graphiql
```
mutation M {
  createVideo(title: "viru", duration: 400, released: false) {
    id, title, duration
  }
}
```

## v10
adding GraphQLInputObjectType for mutation.

```
const videoInputType = new GraphQLInputObjectType({
  name: 'videoInput',
  description: 'video input for mutation',
  fields: {
    title: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'video title',
    },
    duration: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'video duration',
    },
    released: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description: 'is this video released or not',
    },
  },
});
const mutaionType = new GraphQLObjectType({
  name: "mutation",
  description: 'The root mutation',
  fields: {
    createVideo: {
      type: videoType,
      args: {
        video: {
          type: new GraphQLNonNull(videoInputType),
        }
      },
      resolve: (_, args) => createVideo(args.video),
    },
  },
});
```

## v11
adding support of graphql interfacetype
```
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

const videoType = new GraphQLObjectType({
  name: 'VideoType',
  ...
  interfaces: [nodeInterface]
})
```
*Error*
 Interface Type Node does not provide a "resolveType" function and implementing Type VideoType does not provide a "isTypeOf" function. There is no way to resolve this implementing type during execution.

 *Error*
  Node.id expects type "ID!" but VideoType.id provides type "ID".