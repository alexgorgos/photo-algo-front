import * as React from "react";
import { Layout } from "../components/Layout";
import { TextField, Button, Snackbar, MuiAlert } from "@mui/material";
import { Stack } from "@mui/system";

const Contact = () => {
  const [name, setName] = React.useState();
  const [email, setEmail] = React.useState();
  const [message, setMessage] = React.useState();
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
        ...{ name: name, email: email, message: message },
      }),
    })
      .then(() => handleOpenSnack("success", "Thank you! Message sent"))
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

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <Layout>
      <form
        name="photo-contact"
        method="POST"
        data-netlify="true"
        netlify
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="photo-contact" value="photo-contact" />
        <Stack>
          <TextField
            id="filled-basic"
            label="Your name:"
            name="name"
            variant="filled"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="filled-basic"
            label="Your email:"
            name="email"
            variant="filled"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id="filled-multiline-static"
            label="Your message:"
            name="message"
            multiline
            rows={4}
            variant="filled"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button type="submit">Send</Button>
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
