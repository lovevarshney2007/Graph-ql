const {GraphQLSchema,GraphQLObjectType,GraphQLString } = require("graphql");
// these are classes which comes from graphql
// GraphQLSchema -> schema define
// queries or mutation ko ham GraphQLObjectType ke andar hi likhte hai 
// GraphQLString -> return karega string ko

const RootQuery = new GraphQLObjectType({
    // name mandatory hai ye non empty hota hai 
    // graphql me name and field mandatory hoti hai query and mutation banane ke liye 
    // name must be unqiue and any string

    name:'RootQueryType',
    fields:{
        // hello ek query hai 
        hello:{
            type:GraphQLString, // kis type ka data return karna hai (GraphQLString,GraphQLInt,GraphQLString,GraphQLBoolean etc...)

            // resolve is the graphql backend brain 
            // brain hai reolve method ans iske bina return nhi hoga kuchh 

            resolve(){
                return 'Hello from Graphql';
            }
        },
        // hii query (multipe query bana sakte hai )
        hii:{
            type:GraphQLString,
            resolve(){
                return 'hii from Graphql';
            }
        }
    }

})

module.exports = new GraphQLSchema({
    // rootquery ko schema me register kar rahe hai (key ke saath)
    query:RootQuery
});


// GraphSql schema me queries hoti hai 
// and har query ka type and resolve hota hi ha (mandatory)
