import * as React from "react";
import { Layout } from "../components/Layout";
import {
  TextField,
  Button,
  Snackbar,
  Alert,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SendIcon from "@mui/icons-material/Send";
import { ColorModeContext } from "../components/ThemeHandler";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const Contact = () => {
  const theme = useTheme();
  const { executeReCaptcha } = useGoogleReCaptcha();
  const { colorMode } = React.useContext(ColorModeContext);
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

  const [token, setToken] = React.useState("");

  const encode = (data) => {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
      )
      .join("&");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!executeReCaptcha) {
      return;
    }

    if (!data.name) {
      handleOpenSnack("error", "Please don't leave the 'Name' field empty.");
    }

    if (!data.email) {
      handleOpenSnack("error", "Please don't leave the 'Email' field empty.");
    }

    if (!data.message) {
      handleOpenSnack("error", "Please don't leave the 'Message' field empty.");
    }

    if (data.name || data.message || data.email) {
      const tokenRes = await executeReCaptcha("contactPage");
      setToken(tokenRes);

      const formData = {
        token: token,
        formData: {
          name: data.name,
          email: data.email,
          message: data.message,
        },
      };

      fetch("/", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((res) => {
          handleOpenSnack("success", "Thank you! Message sent");
          setData({
            name: "",
            email: "",
            message: "",
          });
        })
        .catch((err) => {
          console.log(err);
          handleOpenSnack("error", "Oups! Something went wrong");
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
      <form
        name="photoContactForm"
        method="post"
        onSubmit={(e) => handleSubmit(e)}
        action="https://photo-algo.herokuapp.com/api/exforms/submit"
      >
        <Stack spacing={3} width="50%">
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
            marginTop={3}
            marginBottom={5}
          >
            Please fill out the form bellow
          </Typography>
          <TextField
            id="filled-basic"
            label="Your name:"
            name="name"
            variant="filled"
            value={data.name}
            type="text"
            onChange={(e) => handleChange(e)}
          />
          <TextField
            id="filled-basic"
            label="Your email:"
            name="email"
            variant="filled"
            value={data.email}
            type="email"
            onChange={(e) => handleChange(e)}
          />
          <TextField
            id="filled-multiline-static"
            label="Your message:"
            name="message"
            multiline
            rows={4}
            variant="filled"
            value={data.message}
            type="text"
            onChange={(e) => handleChange(e)}
          />
          <Button
            variant="text"
            type="submit"
            endIcon={<SendIcon />}
            disableRipple
            disableElevation
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
    </Layout>
  );
};

export default Contact;
