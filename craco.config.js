const path = require("path");

module.exports = function ({ env, paths }) {
  return {
    // style: {
    //   postcss: {
    //     // plugins: [require('tailwindcss'), require('autoprefixer')],
    //   },
    // },
    webpack: {
      alias: {
        environment: path.join(
          __dirname,
          "src",
          "environments",
          process.env.CLIENT_ENV
        ),
      },
    },
  };
};
