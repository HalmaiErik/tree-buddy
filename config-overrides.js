/* config-overrides.js */
const { override, addLessLoader } = require('customize-cra');

module.exports = override(
  addLessLoader({
    // If you are using less-loader@5 or older version, please spread the lessOptions to options directly.
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: 
      { 
        '@enable-dark-mode': 'true',
        '@primary-color-dark': '#429321',
        '@font-family-base': "'Poppins', sans-serif"
      }
    }
  })
)