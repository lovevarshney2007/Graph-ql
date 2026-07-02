const {graphQLObjectType,GraphQLID,GraphQLString, GraphQLObjectType,GraphQLList} = require("graphql")


const BookModel = require("../models/BookModel")

const CategoryType = new GraphQLObjectType({
    name: "Category",
    fields : () => {
        const  BookType = require("../types/BookType")
        return {
            id: { type:GraphQLID},
            name:{type:GraphQLString},
            books : {
                type: new GraphQLList(BookType),
                async resolve(parent,args){
                    return await BookModel.find({categoryIds:parent.id})
                }
            }
}
    }
})

module.exports = CategoryType     