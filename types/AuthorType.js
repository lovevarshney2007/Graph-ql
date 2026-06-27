const {graphQLObjectType,GraphQLID,GraphQLString,GraphQLList, GraphQLObjectType} = require("graphql")


const Book = require("../models/BookModel")

const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields : () => {
        const BookType = require("../types/BookType")
       return   {
        id: { type:GraphQLID},
        name:{type:GraphQLString},
        books : {
            type: new GraphQLList(BookType),
            resolve(parent){
                return Book.find({ authorId: parent.id});
            }
        }
    }
}
})

module.exports = AuthorType