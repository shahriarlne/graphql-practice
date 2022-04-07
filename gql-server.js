const {ApolloServer} = require('apollo-server-express');
const { application } = require('express');

require('dotenv').config();

const typeDefs = `
    type Query {
        totalPosts:Int!
    }
`;

const resolvers = {
    Query:{
        totalPosts:() => 42
    }
};

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
});

apolloServer.listen(process.env.PORT,function(){
    console.log(`Server is running at ${process.env.PORT}`)
});