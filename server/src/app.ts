// import {ApolloServer} from "@apollo/server";
import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import {dbModel} from "./model/dynamoDB.model";
import {urlSchemaResolver} from "./controllers/url.controller";
import path from "path";
require("dotenv").config({path:path.resolve(__dirname,"../.env")});

// importing and creating instance for typedefs
const type = new dbModel();
const typeDefs = type.DynamoDBModel();

// importing and creating instance for resolvers
const resolve = new urlSchemaResolver();
const resolvers = resolve.typedefsResolver();


const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    context :async ({req,res})=>({query:req.query, body:res.send})
})



const PORT = process.env.PORT;


apolloServer.listen(PORT).then(({url})=>{console.log(`server ready at url: ${url}`)}).catch((err)=>{console.log(`error occured at server creation ${err}`)});