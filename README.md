# Lateralus Notes

This is a cloned (not forked as you can't fork subfolders, unfortunately) repository of the gatsby source plugin for Sylius.
The reasons for cloning it are the immature ("Alpha") support of features from the base repo, such as:
- Hardcoded image URLs which break when you use CDNs.
- No support for locales.

--------

# gatsby-source-sylius

A Gatsby source plugin for sourcing data from Sylius via the [ShopApiPlugin](https://github.com/Sylius/ShopApiPlugin).

## Install

```
npm install --save gatsby-source-sylius
```

# How to use

```javascript
// In your gatsby-config.js

module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-sylius`,
      options: {
        syliusUrl: `https://{{your-sylius-url}}`,
      },
    },
  ],
};
```

## Options

### `syliusUrl`

The url to your Sylius shop

### `attributeDefinitions`

If you want to access [Attributes](https://github.com/Sylius/ShopApiPlugin#attributes), you need to declare the associated GraphQL types.

For example :

```javascript
// In gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-sylius`,
      options: {
        syliusUrl: `https://{{sylius-url}}`,
        attributeDefinitions: `
          type Attributes {
            photographer: String
            unsplash_url: String
          }
        `,
      },
    },
  ],
};
```

Thoses types will be included direcly in the schema, so you can declare complex types if needed.

## License

MIT
