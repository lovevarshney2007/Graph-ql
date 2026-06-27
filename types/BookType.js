const {graphQLObjectType,GraphQLID,GraphQLString, GraphQLObjectType,} = require("graphql")


const Author = require("../models/AuthorModel")

const BookType = new GraphQLObjectType({
    name: "Book",
    fields : () => {
        const AuthorType = require("../types/AuthorType")
        
        return {
        id: { type:GraphQLID},
        title:{type:GraphQLString},
        authorId: {type:GraphQLID},
        author : {
            type:AuthorType,
            resolve(parent){
                return Author.findById(parent.authorId)
            }
        }
    }
}
})

module.exports = BookType     