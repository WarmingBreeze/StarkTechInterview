module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          "https://www.digitimes.com.tw/webservice/Intelligence/datacharts/:path*", // 目標 API URL
      },
    ];
  },
};