const express = require("express")
const {graphqlHTTP} = require("express-graphql")
// express-graphql middleware for connectivity between express and graphsql
// graphqlHttp is like http in normal server which handle http request
const schema = require("./schema/schema")


const app = express();

app.use("/graphql",graphqlHTTP({
    schema, // hamne apna schema de diya jo data return hoga 
    graphiql: true
    // it provides user interface for queries 
    // and if it is false then no ui

}))

app.listen(4000,()=> {
    console.log(`Server is running on http://localhost:4000/graphql`);
})