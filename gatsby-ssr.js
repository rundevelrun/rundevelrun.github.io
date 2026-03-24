const React = require("react")
const blogConfig = require("./blog-config")

exports.onRenderBody = ({ setHeadComponents }) => {
  if (process.env.NODE_ENV === "production") {
    setHeadComponents([
      React.createElement("meta", {
        key: "google-adsense-account",
        name: "google-adsense-account",
        content: blogConfig.adsense.client,
      }),
      React.createElement("script", {
        key: "google-adsense",
        async: true,
        src: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${blogConfig.adsense.client}`,
        crossOrigin: "anonymous",
      }),
    ])
  }
}
