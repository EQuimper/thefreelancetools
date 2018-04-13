const rewireReactHotLoader = require('react-app-rewire-hot-loader');

module.exports = function override(config: any, env: string) {
  config = rewireReactHotLoader(config, env);
  return config;
};
