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
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SendIcon from "@mui/icons-material/Send";
import { ColorModeContext } from "../components/ThemeHandler";

const Contact = () => {
  const theme = useTheme();
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

  const encode = (data) => {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
      )
      .join("&");
  };

  const handleSubmit = (e) => {
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": e.target.getAttribute("name"),
        ...data,
      }),
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
    e.preventDefault();
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
        name="Photo Contact Form"
        method="post"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={(e) => handleSubmit(e)}
      >
        <input type="hidden" name="photo-contact" value="Photo Contact Form" />
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
          <p hidden>
            <label>
              Don’t fill this out:{" "}
              <input name="bot-field" onChange={(e) => handleChange(e)} />
            </label>
          </p>
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
