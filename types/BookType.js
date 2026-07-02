const {graphQLObjectType,GraphQLID,GraphQLString, GraphQLObjectType,GraphQLList} = require("graphql")


const Author = require("../models/AuthorModel")
const CategoryModel = require("../models/CategoryModel")

const BookType = new GraphQLObjectType({
    name: "Book",
    fields : () => {
        const AuthorType = require("../types/AuthorType")
        const CategoryType = require("../types/CategoryType")

        return {
        id: { type:GraphQLID},
        title:{type:GraphQLString},
        authorId: {type:GraphQLID},
        author : {
            type:AuthorType,
            resolve(parent){
                return Author.findById(parent.authorId)
            }
        },
        categories : {
            type: new GraphQLList(CategoryType),
            async resolve(parent,args){
                return await CategoryModel.find({_id: {$in: parent.categoryIds}})
            }
        }
    }
}
})

module.exports = BookType     