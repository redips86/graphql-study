import {ApolloServer, gql} from "apollo-server";

const typeDefs = gql(`
    type Query {
        allTweets: [Tweet]
        tweet(id: ID): Tweet
    }
    type Tweet {
        id: ID
        text: String
        author: User
    }
    type User{
        id: ID
        username: String
    }
`);

const server = new ApolloServer({typeDefs});

server.listen().then(({url}) => {
    console.log(`Running on ${url}`);
});