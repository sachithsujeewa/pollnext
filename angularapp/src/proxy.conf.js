const PROXY_CONFIG = [
  {
    context: [
      "/question",
    ],
    target: "http://jjb.azurewebsites.net",
    secure: false
  }
]

module.exports = PROXY_CONFIG;
