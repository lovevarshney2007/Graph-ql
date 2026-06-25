const {GraphQLSchema,GraphQLObjectType,GraphQLString } = require("graphql");
// these are classes which comes from graphql

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        hello:{
            type:GraphQLString,
            resolve(){
                return 'Hello from Graphql';
            }
        }
    }

})

module.exports = new GraphQLSchema({
    query:RootQuery
});