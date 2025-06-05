const path = require('path');

module.exports = function override(config, env) {
  // Find the babel-loader rule
  const babelLoader = config.module.rules.find(rule => 
    rule.oneOf && rule.oneOf.find(oneOf => 
      oneOf.loader && oneOf.loader.includes('babel-loader')
    )
  );

  if (babelLoader) {
    const babelRule = babelLoader.oneOf.find(oneOf => 
      oneOf.loader && oneOf.loader.includes('babel-loader')
    );

    if (babelRule) {
      // Add the react-refresh babel plugin
      babelRule.options.plugins = [
        [
          require.resolve('babel-plugin-named-asset-import'),
          {
            loaderMap: {
              svg: {
                ReactComponent: '@svgr/webpack?-svgo,+titleProp,+ref![path]',
              },
            },
          },
        ],
        env === 'development' && require.resolve('react-refresh/babel'),
      ].filter(Boolean);
    }
  }

  if (env === 'development') {
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-refresh/runtime': path.resolve(__dirname, 'node_modules/react-refresh/runtime'),
    };
  }

  return config;
}; 