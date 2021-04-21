const {
  GraphQLString,
  GraphQLObjectType,
  GraphQLID,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull,
} = require("graphql");

const UrlModel = require("../models/urlModel");
const uniqueUrlCode = require("../../middlewares/uniqueUrlCode");
const validateUrl = require("../../middlewares/validateUrl");

const UrlType = new GraphQLObjectType({
  name: "Url",
  fields: {
    id: { type: GraphQLID },
    url: { type: GraphQLString },
    shortenedUrl: { type: GraphQLString },
    link: { type: GraphQLString },
  },
});

const queries = new GraphQLObjectType({
  name: "Query",
  fields: {
    //Returns all URLs
    urls: {
      type: GraphQLList(UrlType),
      resolve: (root, args, context, info) => {
        return UrlModel.find().exec();
      },
    },
    //Returns single URL by Id
    url: {
      type: UrlType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve: (root, args, context, info) => {
        return UrlModel.findById(args.id).exec();
      },
    },
  },
});

const mutations = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createShortUrl: {
      type: UrlType,
      args: {
        url: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: (root, args, context, info) => {
        if (validateUrl.isValid(args.url)) {
          const newUrl = new UrlModel({
            url: args.url,
            shortenedUrl: uniqueUrlCode.generate(),
            link:
              "https://quiet-gorge-13846.herokuapp.com/" +
              uniqueUrlCode.generate(),
          });
          return newUrl.save();
        } else {
          throw new Error("Invalid URL");
        }
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: queries,
  mutation: mutations,
});

module.exports = schema;
