const { getAllProductsData, getAllCategoryData } = require("./syliusClient");
const { adaptProduct, adaptCategory } = require("./normalize");

module.exports = async (
  { actions, createNodeId, createContentDigest },
  options
) => {
  const { createNode } = actions;

  const createNodeFromCategory = categoryData => {
    const nodeContent = JSON.stringify(categoryData);

    const nodeMeta = {
      id: createNodeId(`category-${categoryData.code}`),
      parent: null,
      children: [],
      internal: {
        type: `Category`,
        mediaType: `text/html`,
        content: nodeContent,
        contentDigest: createContentDigest(categoryData),
      },
    };

    const node = Object.assign({}, categoryData, nodeMeta);
    createNode(node);

    return node.id;
  };

  const createNodeFromProduct = async productData => {
    const nodeContent = JSON.stringify(productData);

    const nodeMeta = {
      id: createNodeId(`product-${productData.code}`),
      parent: null,
      children: [],
      internal: {
        type: `Product`,
        mediaType: `text/html`,
        content: nodeContent,
        contentDigest: createContentDigest(productData),
      },
    };

    const node = Object.assign({}, productData, nodeMeta);
    return await createNode(node);
  };

  await getAllCategoryData(options.url).then(categories => {
    return categories.map(originalCategoryData => {
      const categoryData = adaptCategory(originalCategoryData);

      return createNodeFromCategory(categoryData);
    });
  });

  await getAllProductsData(options.url).then(({ items }) => {
    return Promise.all(
      items.map(originalProductData => {
        const productData = adaptProduct({
          product: originalProductData,
          syliusUrl: options.url,
        });
        return createNodeFromProduct(productData);
      })
    );
  });
};
