const React = require("react");
const { ThemeHandler } = require("./src/components/ThemeHandler");

exports.wrapRootElement = ({ element }) => {
  return <ThemeHandler>{element}</ThemeHandler>;
};
