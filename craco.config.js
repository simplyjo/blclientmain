module.exports = {
  webpack: {
    configure: {
      resolve: {
        fallback: {
          "stream": false,
          "http": false,
          "https": false,
          "zlib": false,
          "url": false,
          "assert": false
        },
      },
    },
  },
};