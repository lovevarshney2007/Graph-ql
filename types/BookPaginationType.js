const {graphQLObjectType,GraphQLID,GraphQLString,GraphQLList, GraphQLObjectType,GraphQLInt} = require("graphql")


const Book = require("../models/BookModel")

const BookPaginationType = new GraphQLObjectType({
    name: "BookPagination",
    fields : () => {
        const BookType = require("../types/BookType")
        return {
            books : { type : GraphQLList(BookType)},
            totalPages:{ type: GraphQLInt},
            currentPage:{ type: GraphQLInt},
            hasNextPage:{type: GraphQLString},
            hasPrevPage:{type: GraphQLString}
        }
}
})

module.exports = BookPaginationType