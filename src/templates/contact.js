import * as React from "react";
import { Layout } from "../components/Layout";
import {
  TextField,
  Button,
  Snackbar,
  Alert,
  Stack,
  Typography,
  Grid,
  Box,
  Link,
} from "@mui/material";

import SendIcon from "@mui/icons-material/Send";
import { ColorModeContext } from "../components/ThemeHandler";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

const Contact = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const { colorMode } = React.useContext(ColorModeContext);
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState({
    name: "",
    email: "",
    message: "",
  });

  const [openSnack, setOpenSnack] = React.useState({
    value: false,
    severity: "info",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    let forSending = true;

    if (!executeRecaptcha) {
      return;
    }

    if (!data.name || data.name.length < 1) {
      handleOpenSnack("error", "Please don't leave the 'Name' field empty.");
      forSending = false;
    }

    if (!data.email || data.email.length < 1) {
      handleOpenSnack("error", "Please don't leave the 'Email' field empty.");
      forSending = false;
    }

    if (!data.message || data.message.length < 1) {
      handleOpenSnack("error", "Please don't leave the 'Message' field empty.");
      forSending = false;
    }

    if (forSending) {
      setLoading(true);

      fetch("https://photo-algo.herokuapp.com/api/messages", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({
          data: data,
          token: await executeRecaptcha("homepage"),
        }),
      })
        .then((res) => {
          if (res.status === 200) {
            handleOpenSnack("success", "Thank you! Message sent");
            setData({
              name: "",
              email: "",
              message: "",
            });
            setLoading(false);
          } else {
            handleOpenSnack("error", "Oups! Something went wrong! Try again?");
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
          handleOpenSnack("error", "Oups! Something went wrong! Try again?");
          setLoading(false);
        });
    }
  };

  const handleOpenSnack = (severity, message) => {
    setOpenSnack({ value: true, severity: severity, message: message });
  };

  const handleCloseSnack = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack({ value: false, severity: "info", message: "" });
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <Layout>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          overflowY: "scroll",
        }}
      >
        <Grid container columnSpacing={5}>
          <Grid item xs={12} md={3}>
            <Typography
              variant="h2"
              component="h2"
              textAlign={"left"}
              marginTop={3}
              marginBottom={5}
            >
              Get in touch
            </Typography>
            <Typography
              variant="body1"
              component="p"
              textAlign={"left"}
              marginTop={2}
              marginBottom={2}
            >
              hello@alexandrugorgos.com
            </Typography>
            <Typography
              variant="body1"
              component="p"
              textAlign={"left"}
              marginTop={2}
              marginBottom={2}
            >
              Oxford - United Kingdom
            </Typography>
            <Typography
              variant="body1"
              component="p"
              textAlign={"left"}
              marginTop={2}
              marginBottom={2}
            >
              <Link
                href="https://www.instagram.com/alexandrugorgosphotography/"
                name="instagram"
                target="_blank"
                sx={{
                  color: colorMode === "dark" ? "white" : "black",
                }}
              >
                <InstagramIcon />
              </Link>
              {"  "}
              {"  "}
              <Link
                href="https://twitter.com/alexandrugo_"
                name="twitter"
                target="_blank"
                sx={{
                  color: colorMode === "dark" ? "white" : "black",
                }}
              >
                <TwitterIcon />
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <form
              name="photoContactForm"
              method="post"
              onSubmit={(e) => handleSubmit(e)}
              style={{ cursor: loading && "wait" }}
            >
              <Stack spacing={3}>
                <Typography
                  variant="body1"
                  component="p"
                  textAlign={"left"}
                  marginTop={3}
                  marginBottom={3}
                >
                  Please fill out the form bellow
                </Typography>
                <TextField
                  id="filled-basic"
                  label="Your name:"
                  required
                  name="name"
                  disabled={loading}
                  variant="filled"
                  value={data.name}
                  type="text"
                  onChange={(e) => handleChange(e)}
                />
                <TextField
                  id="filled-basic"
                  label="Your email:"
                  required
                  name="email"
                  disabled={loading}
                  variant="filled"
                  value={data.email}
                  type="email"
                  onChange={(e) => handleChange(e)}
                />
                <TextField
                  id="filled-multiline-static"
                  label="Your message:"
                  required
                  name="message"
                  disabled={loading}
                  multiline
                  rows={4}
                  variant="filled"
                  value={data.message}
                  type="text"
                  onChange={(e) => handleChange(e)}
                />
                <small>
                  This site is protected by reCAPTCHA and the Google{" "}
                  <a href="https://policies.google.com/privacy">
                    Privacy Policy
                  </a>{" "}
                  and{" "}
                  <a href="https://policies.google.com/terms">
                    Terms of Service
                  </a>{" "}
                  apply.
                </small>
                <Button
                  variant="text"
                  type="submit"
                  endIcon={<SendIcon />}
                  disableRipple
                  disableElevation
                  disabled={loading}
                  size="medium"
                  sx={{
                    color: colorMode === "dark" ? "white" : "black",
                    "&:hover": {
                      backgroundColor:
                        colorMode === "dark"
                          ? "rgba(255,255,255,0.1)"
                          : "rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  Send
                </Button>
              </Stack>
            </form>
          </Grid>
        </Grid>

        <Snackbar
          open={openSnack.value}
          autoHideDuration={6000}
          onClose={handleCloseSnack}
        >
          <Alert
            onClose={handleCloseSnack}
            severity={openSnack.severity}
            sx={{ width: "100%" }}
          >
            {openSnack.message}
          </Alert>
        </Snackbar>
      </Box>
    </Layout>
  );
};

export default Contact;
