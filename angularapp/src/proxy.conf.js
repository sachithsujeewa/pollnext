const PROXY_CONFIG = [
  {
    context: [
      "/question",
    ],
    target: "https://localhost:7208",
    secure: false
  }
]

module.exports = PROXY_CONFIG;
