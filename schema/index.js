const {
  graphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLNonNull,
} = require("graphql");

const AuthorType = require("../types/AuthorType");
const BookType = require("../types/BookType");
const BookPaginationType = require("../types/BookPaginationType");
const Author = require("../models/AuthorModel");
const Book = require("../models/BookModel");
const CategoryType = require("../types/CategoryType");
const Category = require("../models/CategoryModel");

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLString },
      },
      resolve(parent, args) {
        const author = new Author({ name: args.name });
        return author.save();
      },
    },
    addBook: {
      type: BookType,
      args: {
        title: { type: GraphQLString },
        authorId: { type: GraphQLID },
        categoryIds: { type: new GraphQLList(GraphQLID) },
      },
      resolve(parent, args) {
        const book = new Book({
          title: args.title,
          authorId: args.authorId,
          categoryIds: args.categoryIds,
        });
        return book.save();
      },
    },
    addCategory: {
      type: CategoryType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const category = new Category({ name: args.name });
        return category.save();
      },
    },
  },
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    authors: {
      type: new GraphQLList(AuthorType),
      resolve() {
        return Author.find();
      },
    },

    books: {
      type: BookPaginationType,
      args: {
        page: { type: GraphQLInt },
        authorId: { type: GraphQLID },
      },
      async resolve(parent, args) {
        const limit = 2;
        const page = args.page || 1;
        const offsett = (page - 1) * limit;

        const filter = {};
        if (args.authorId) {
          filter.authorId = args.authorId;
        }

        const totalCount = await Book.countDocuments(filter);
        const taotalPages = Math.ceil(totalCount / limit);
        const books = await Book.find(filter).skip(offsett).limit(limit);

        return {
          books,
          totalPages: taotalPages,
          currentPage: page,
          hasNextPage: page < taotalPages ? "true" : "false",
          hasPrevPage: page > 1 ? "true" : "false",
        };
      },
    },
    category: {
      type: CategoryType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        return Category.findById(args.id);
      },
    },
    categories: {
      type: new GraphQLList(CategoryType),
      resolve() {
        return Category.find();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
