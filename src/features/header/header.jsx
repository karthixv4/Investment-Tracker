import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
//import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import './header.css'



const Header = () => {
  const [isLogged, setisLogged] = useState(false);

  useEffect(() => {
    checkStorage();
    return () => {};
  }, [isLogged]);

  function checkStorage() {
    if (localStorage.getItem("token")) {
      setisLogged(true);
    } else {
      setisLogged(false);
    }
  }
 
  const navigate = useNavigate();
  const handleNavigateLogout = () => {
    setisLogged(false);
    localStorage.clear();
    navigate("/");
  };
  const handleNavigateregister = () => {
    navigate("/register");
  };


  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
           
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Investment Tracker
            </Typography>
            {/* <Button color="inherit">Login</Button> */}
            {!isLogged ? (
          <Button  id="logout" color="inherit" className="logoutbtn" onClick={handleNavigateregister}>Sign Up</Button>
      
        ) : (
          <Button onClick={handleNavigateLogout} color="inherit" className="logoutbtn">
          Logout
        </Button>
         
        )}
          </Toolbar>
       
        </AppBar>
      </Box>
    </>
  );
};
export default Header;
