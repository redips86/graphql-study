import {ApolloServer, gql} from "apollo-server";

const tweets = [
    {
        id: "1",
        text: "hello",
    },
    {
        id: "2",
        text: "hello2",
    },
];

const typeDefs = gql(`
    type Query {
        allTweets: [Tweet]
        tweet(id: ID!): Tweet
        ping: String!
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
    type Mutation {
        postTweet(text: String, userId: ID): Tweet
        deleteTweet(userId: ID): Boolean
    }
`);

const resolvers = {
    Query: {
        allTweets() {
            return tweets;
        },
        tweet(_, {id}) {
            return tweets.find(tweet => tweet.id === id);
        },
        ping(){
            return "pong";
        }
    }
}

const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({url}) => {
    console.log(`Running on ${url}`);
});