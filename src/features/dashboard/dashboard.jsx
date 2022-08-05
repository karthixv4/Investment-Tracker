import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Records from "../records/records";
import { fetchRecords } from "../../reducers/recordSlice";
import { useDispatch } from "react-redux";
import './dashboard.css'
const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/addRecord");
  };
  const handleNavigateReport = () => {
    dispatch(fetchRecords());
    navigate("/investments");
  };
  // const handleNavigateLogout = () => {
  //   localStorage.clear();
  //   navigate("/");
  // };
  const handleNavigateFilter = () => {
    navigate("/filter");
  };
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);
  return (
    <div>
      <h2>Welcome to Investment Tracker</h2>
      <Button variant="contained"  className="commonbtn" onClick={handleNavigate}>
        Add Record
      </Button>
      &nbsp;&nbsp;&nbsp;
      <Button variant="contained" id="graph" className="commonbtn" onClick={handleNavigateReport}>
        View Graph
      </Button>
      &nbsp;&nbsp;&nbsp;
      {/* <Button variant="contained" className="commonbtn" onClick={handleNavigateFilter}>
        Filter Range
      </Button>
      &nbsp;&nbsp;&nbsp; */}
      {/* <Button variant="contained" onClick={handleNavigateLogout}>
        Logout
      </Button> */}
      <hr />
      <Records></Records>
    </div>
  );
};

export default Dashboard;
