const React = require("react");
const { ThemeHandler } = require("./src/components/ThemeHandler");
const { GoogleReCaptchaProvider } = require("react-google-recaptcha-v3");

exports.wrapRootElement = ({ element }) => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey="6LfUyL8hAAAAAEQoro7o-1wtic-iRV0VhHyBvaD3">
      <ThemeHandler>{element}</ThemeHandler>
    </GoogleReCaptchaProvider>
  );
};
