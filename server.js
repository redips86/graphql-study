import {ApolloServer, gql} from "apollo-server";

const typeDefs = gql(`
    type Query {
        text: String
    }
`);

const server = new ApolloServer({typeDefs});

server.listen().then(({url}) => {
    console.log(`Running on ${url}`);
});