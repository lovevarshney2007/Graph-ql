const {GraphQLSchema,GraphQLObjectType,GraphQLString, GraphQLInt, GraphQLList } = require("graphql");
// these are classes which comes from graphql
// GraphQLSchema -> schema define
// queries or mutation ko ham GraphQLObjectType ke andar hi likhte hai 
// GraphQLString -> return karega string ko

const User = require("../models/UserModel")

const UserType = new GraphQLObjectType({
    name:"User",
    fields:{
        id:{ type:GraphQLString},
        name:{ type:GraphQLString},
        age:{ type:GraphQLInt},
    }
})


const RootQuery = new GraphQLObjectType({
    // name mandatory hai ye non empty hota hai 
    // graphql me name and field mandatory hoti hai query and mutation banane ke liye 
    // name must be unqiue and any string

    name:'RootQueryType',
    fields:{

        users:{
            type: new GraphQLList(UserType),
            resolve(parent,args){
                return User.find();
            }
        },

        user:{
            type:UserType,
            // args for input
            args:{id: {type:GraphQLString}},
            // resolve 2 argument leta hai
            resolve(parent,args){
                return  User.findById(args.id)  
            }
        },

        // hello ek query hai 
        hello:{
            // schema strongly type hota hai 
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

// Mutation Type working
const Mutation = new GraphQLObjectType({
    name:"Mutation",
    fields:{
        addUser:{
            type:UserType,
            args:{
                name:{type:GraphQLString},
                age:{type:GraphQLInt}
            },
            async resolve(parent,args){
                const user = new User({
                    name:args.name,
                    age:args.age
                });
                return await user.save();
            }
        },

        updateUser:{
            type:UserType,
            args:{
                id:{type:GraphQLString},
                name:{type:GraphQLString},
                age:{type:GraphQLInt}
            },
            async resolve(parent,args){
               return await User.findByIdAndUpdate(
                args.id,
                {
                    name:args.name,
                    age:args.age
                },{new : true}
               )
                
            }
        },

        deleteUser:{
            type:UserType,
            args:{
                id:{type:GraphQLString}
            },
            async resolve(parent,args){
               
               return await User.findByIdAndDelete(args.id)
                
            }
        }
    }
})  


module.exports = new GraphQLSchema({
    // rootquery ko schema me register kar rahe hai (key ke saath)
    query:RootQuery,
    mutation:Mutation
});


// GraphSql schema me queries hoti hai 
// and har query ka type and resolve hota hi ha (mandatory)
