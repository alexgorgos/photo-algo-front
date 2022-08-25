import * as React from "react";
import { Layout } from "../components/Layout";
import { TextField, Button, Snackbar, MuiAlert } from "@mui/material";
import { Stack } from "@mui/system";

const Contact = () => {
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
    e.preventDefault();
    console.log(
      encode({
        "form-name": "photo-contact",
        ...data,
      })
    );
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": "photo-contact",
        ...data,
      }),
    })
      .then((res) => handleOpenSnack("success", "Thank you! Message sent"))
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

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <Layout>
      <form
        name="Photo Contact Form"
        method="POST"
        data-netlify="true"
        onSubmit={(e) => handleSubmit(e)}
      >
        <input type="hidden" name="photo-contact" value="Photo Contact Form" />
        <Stack>
          <TextField
            id="filled-basic"
            label="Your name:"
            name="name"
            variant="filled"
            value={data.name}
            type="text"
            onChange={(e) => setData(handleChange(e))}
          />
          <TextField
            id="filled-basic"
            label="Your email:"
            name="email"
            variant="filled"
            value={data.email}
            type="email"
            onChange={(e) => setData(handleChange(e))}
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
            onChange={(e) => setData(handleChange(e))}
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
