const {GraphQLSchema,GraphQLObjectType,GraphQLString, GraphQLInt } = require("graphql");
// these are classes which comes from graphql
// GraphQLSchema -> schema define
// queries or mutation ko ham GraphQLObjectType ke andar hi likhte hai 
// GraphQLString -> return karega string ko

 const users = [
                    {id:'1',name:"Love Varshney",age:20},
                    {id:'2',name:"Keshav Varshney",age:25}
                ];

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

        user:{
            type:UserType,
            // args for input
            args:{id: {type:GraphQLString}},
            // resolve 2 argument leta hai
            resolve(parent,args){
            

                return users.find(user => user.id === args.id);
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
            resolve(parent,args){
                const user = {
                    id:users.length + 1 + "",
                    name:args.name,
                    age:args.age
                }

                users.push(user);
                console.log(users)
                return user;
            }
        },

        updateUser:{
            type:UserType,
            args:{
                id:{type:GraphQLString},
                name:{type:GraphQLString},
                age:{type:GraphQLInt}
            },
            resolve(parent,args){
                const user = users.find(u => u.id === args.id);
                if(user){
                    user.name = args.name || user.name,
                    user.age = args.age || user.age

                    console.log(users)
                    return user;
                }

                throw new Error("User not Found");
                
            }
        },

        deleteUser:{
            type:UserType,
            args:{
                id:{type:GraphQLString}
            },
            resolve(parent,args){
                const index = users.findIndex(u => u.id === args.id);
                if(index === -1) throw new Error("User not found");
                console.log("User deleted successfully");
               
                return users.splice(index,1)[0];
                 console.log(users);
                
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
