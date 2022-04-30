const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#0BD89D',
              '@layout-body-background': '#FFFFFF',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ]
};