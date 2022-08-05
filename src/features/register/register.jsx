import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import User from "../../model/user";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { saveUsers } from "./../../reducers/registerSlice";
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Register = () => {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Handling Form
  const handleForm = (e) => {
    e.preventDefault();
    let user = new User();
    user.name = name;
    user.email = email;
    user.password = password;
    console.log(user);
    dispatch(saveUsers(user));
   // setOpen(true);
    navigate("/");
  };
  return (
    <div className="main">
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="140"
          image={require("../../images/Login.png")}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            SIGN UP
          </Typography>
          <form onSubmit={handleForm}>
            <TextField
              id="name"
              onChange={(e) => setName(e.target.value)}
              label="Your Name"
              variant="standard"
            />
            <TextField
              id="Email"
              onChange={(e) => setEmail(e.target.value)}
              label="Email-Id"
              helperText={
                email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)
                  ? null
                  : "Enter valid email"
              }
              variant="standard"
            />
            <TextField
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              helperText={
                password.match(
                  "^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
                )
                  ? null
                  : "Enter a Strong Password"
              }
              type="password"
              label="Password"
              variant="standard"
            />
            <br />
            <br />
            <Button variant="contained" className="commonbtn" type="submit" id="register">
              Register
            </Button>
            <br />
            <br />
            <Typography gutterBottom variant="h9" component="div">
              Have an account <Link to="/" id="log">Login here! </Link>
            </Typography>
          </form>
        </CardContent>
      </Card>

      <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    User Registered Successfully !! Please Login Again !!!
                    </Alert>
                </Snackbar>
          </Stack>
    </div>
  );
};

export default Register;
