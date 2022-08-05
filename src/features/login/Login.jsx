import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import "./login.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "./../../reducers/loginSlice";
import { Link, useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const Login = () => {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError,setEmailError] = useState("");
  const [passwordError,setPasswordError]=useState("") 

  const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };

  const dispatch = useDispatch();
  const thiss = useSelector((state) => state.logins);
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);
  const navigate = useNavigate();
  //Onsubmit
  const handleForm = (e) => {
    e.preventDefault();

    thiss.users.map((ele) => {
      if (ele.email === email && ele.password === password) {
        console.log("suceess");
        navigate("/dashboard");
        localStorage.setItem("token", ele.id);
      } else {
        setOpen(true);
        console.log("failed");
      }
    });
  };



  const handleOnChange = (event) => {
        
    let myValue = event.target.value
    let myName = event.target.name

 
    console.log("----",myValue);
    if(myName === "email"){
        if(myValue.length<=10)
        {
            setEmailError("User Email is not valid")
            setEmail(myValue)
        }

    else{
            setEmailError(" ")
            setEmail(myValue)
        }}  
    else{
        if(myValue.length<3)
        {   
            setPasswordError("User password is not valid")
            //console.log(PasswordError);
            setPassword(myValue)
        }
        else{
            setPasswordError("")
            setPassword(myValue)

        }
        
    }
}
  // if (!localStorage.getItem("token")) {
  //   alert("hey");
  // }

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
            Login
          </Typography>
          <form onSubmit={handleForm}>
            <TextField
              id="email"
              onChange = {handleOnChange}
              label="Email"
              name = "email"
              variant="standard"
              helperText = {emailError}/>
            
            <TextField
              id="password"
              onChange = {handleOnChange}
              type="password"
              name="password"
              label="Password"
              variant="standard"
              helperText = {passwordError}
            />
            <br />
            <br />
            <Button variant="contained" className="commonbtn" id="login" type="submit">
              Login
            </Button>
            <br />
            <br />
            <Typography gutterBottom variant="h9" component="div">
              New user? <Link to="/register" id="register">Register here! </Link>
            </Typography>
          </form>
        </CardContent>
      </Card>

      <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    Invalid User credentials ! Please SignUp
                    </Alert>
                </Snackbar>
          </Stack>
    </div>
  );
};

export default Login;
