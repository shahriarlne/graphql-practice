const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");
const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge");
const { loadFilesSync } = require("@graphql-tools/load-files");
const http = require("http");
const mongoose= require('mongoose');
const path = require("path");

require("dotenv").config();

const app = express();

const db = async () =>{
    try{
        const success = await mongoose.connect(process.env.DATABASE_CLOUD,{
            useNewUrlParser:true,
            useUnifiedTopology: true,
            // useCreateIndex:true,
            // useFindAndModify:false
        });
        console.log('DB Connected')
    }
    catch (error){
        console.log('DB Connection error',error)
    }
};
db();

const typeDefs = mergeTypeDefs(loadFilesSync(path.join(__dirname, "./typeDefs")));

const resolvers = mergeResolvers(
  loadFilesSync(path.join(__dirname, "./resolvers"))
);


let apolloServer = null;
async function startServer() {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  //Apply Middleware method connects apollosrver to  a specific HTTP framwork
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
}
startServer();

const httpserver = http.createServer(app);

app.get("/rest", function (req, res) {
  res.json({
    data: "Have fun you just hit rest endpoint great!",
  });
});

app.listen(process.env.PORT, function () {
  console.log(`SERVER IS RUNNIG AT ${process.env.PORT}`);
  console.log(
    `graphql SERVER IS RUNNIG AT ${process.env.PORT}`
  );
});
