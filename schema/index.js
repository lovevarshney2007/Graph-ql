const {graphQLObjectType,GraphQLID,GraphQLString,GraphQLList, GraphQLObjectType,GraphQLSchema} = require("graphql")

const AuthorType = require("../types/AuthorType");
const BookType = require("../types/BookType")
const Author = require("../models/AuthorModel")
const Book = require("../models/BookModel")

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields : {
        addAuthor : {
            type: AuthorType,
            args : {
                name: {type: GraphQLString}
            },
             resolve(parent,args){
                const author = new Author({ name : args.name })
                return author.save();
            }
        },
        addBook : {
            type: BookType,
            args : {
                title: {type: GraphQLString},
                authorId:{ type : GraphQLID}
            },
             resolve(parent,args){
                const book = new Book({
                     title : args.title ,
                     authorId: args.authorId
                    })
                return book.save();
            }
        }
    }
})

const RootQuery = new GraphQLObjectType({
    name:"RootQueryType",
    fields:{
        authors : {
            type: new GraphQLList(AuthorType),
            resolve(){
                return Author.find();
            }
        },

        books : {
            type: new GraphQLList(BookType),
            resolve(){
                return Book.find();
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query:RootQuery,
    mutation: Mutation
})