// next.config.js
module.exports = {
    async redirects() {
      return [
        {
          source: '/',
          destination: '/signup',
          permanent: true,
        },
      ];
    },
    images: {
      remotePatterns: [
        {
          hostname: "utfs.io",
          hostname: "aceternity.com",
          hostname: "images.unsplash.com",
          // Optionally, you can add `protocol` and `port` if needed
          // protocol: "https",
          // port: "",
        },
      ],
    },
  };
  