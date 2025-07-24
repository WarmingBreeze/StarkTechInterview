module.exports = {
  async rewrites() {
    return [
      {
        source: "/api",
        destination:
          "https://api.finmindtrade.com/api/v4/data", // 目標 API URL
      },
    ];
  },
};