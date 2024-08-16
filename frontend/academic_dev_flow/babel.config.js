module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: 'current' } }],
    "@babel/preset-react"
  ],
  plugins: [
    "@babel/plugin-proposal-class-properties",
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-transform-runtime",
    "@babel/plugin-proposal-private-property-in-object",
    "@babel/plugin-proposal-private-methods"
  ]
};
