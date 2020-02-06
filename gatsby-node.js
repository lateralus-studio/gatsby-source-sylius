const validateOptions = require("./validateOptions");
const createSchemaCustomization = require("./createSchemaCustomization");
const createResolvers = require("./createResolvers");
const sourceNodes = require("./sourceNodes");
const provideProductsField = require("./provideProductsField");

exports.onPreBootstrap = validateOptions;
exports.createSchemaCustomization = createSchemaCustomization;
exports.createResolvers = createResolvers;
exports.sourceNodes = sourceNodes;
exports.onCreateNode = ({ node, getNode, createNodeId, actions }) => {
  const { createNodeField } = actions;
  provideProductsField({ node, getNode, createNodeId, createNodeField });
};
