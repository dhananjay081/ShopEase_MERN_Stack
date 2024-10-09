// config-overrides.js
module.exports = {
    webpack: (config) => {
      config.resolve.fallback = {
        fs: false,  // `fs` cannot be polyfilled in the browser
        path: require.resolve("path-browserify"),
        os: require.resolve("os-browserify/browser"),
      };
      return config;
    },
  };
  