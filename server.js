import {ApolloServer, gql} from "apollo-server";

let tweets = [
    {
        id: "1",
        text: "hello",
        userId: "2"
    }, {
        id: "2",
        text: "hello2",
        userId: "11"
    }];

let users = [{
    id: "1",
    firstName: "first",
    lastName: "last"
}, {
    id: "2",
    firstName: "elon",
    lastName: "musk"
}]

const typeDefs = gql(`
    type Query {
        allTweets: [Tweet]
        tweet(id: ID!): Tweet
        allUsers: [User!]!
    }
    type User {
        id: ID!
        firstName: String!
        lastName: String!
        """
        풀네임 한글도 되나?
        """
        fullName: String!
    }
    """
    Tweet object represents a resource for a Tweet
    """
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
        """
        mutation delete a tweet
        """
        deleteTweet(id: ID!): Boolean
    }
`);

const resolvers = {
    Query: {
        allTweets() {
            return tweets;
        }, tweet(_, {id}) {
            return tweets.find(tweet => tweet.id === id);
        }, allUsers() {
            return users;
        }
    },
    Mutation: {
        postTweet(_, {text, userId}) {
            const exists = users.findIndex(user => user.id === userId);
            if (exists === -1) {
                throw new Error(`not found userId : ${userId}`)
            }

            const newTweet = {
                id: tweets.length + 1, text, userId
            }

            tweets.push(newTweet);
            return newTweet;
        }, deleteTweet(_, {id}) {
            const tweet = tweets.find(tweet => tweet.id === id)
            if (!tweet) {
                return;
            }
            tweets = tweets.filter(tweet => tweet.id !== id)
            return true;
        }
    },
    User: {
        fullName({firstName, lastName}) {
            return `${firstName} ${lastName}`;
        }
    },
    Tweet: {
        author({userId}) {
            return users.find(user => user.id === userId);
        }
    }
}

const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({url}) => {
    console.log(`Running on ${url}`);
});