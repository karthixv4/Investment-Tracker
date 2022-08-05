import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import Strategy from "../../model/strategy";
import { addRecord } from "../../reducers/recordSlice";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { fetchRecords } from "./../../reducers/recordSlice";
import { useNavigate } from "react-router-dom";
import './addRecord.css'

const AddRecord = () => {
  // useEffect(() => {
  //   dispatch(fetchRecords());
  // }, []);
  const records = useSelector((state) => state.records);

  const [strategyTitle, setstrategyTitle] = useState("");
  const [decisionDate, setdecisionDate] = useState("");
  const [ombInitiative, setombInitiative] = useState("");
  const [useOfSavingsAvoidance, setuseOfSavingsAvoidance] = useState("");
  const [amountType, setamountType] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleForm = (e) => {
    e.preventDefault();
    let strategy = new Strategy();
    strategy.strategyTitle = strategyTitle;
    strategy.decisionDate = decisionDate;
    strategy.ombInitiative = ombInitiative;
    strategy.useOfSavingsAvoidance = useOfSavingsAvoidance;
    strategy.amountType = amountType;
    // strategy = {
    //   ...strategy,
    //   hi: "HI",
    // };
    console.log("Sucess");
    dispatch(addRecord(strategy));
    navigate("/dashboard");
  };

  return (
    <div>
     <h1 className="addRecord">Add Record</h1> 
      <form onSubmit={handleForm} className="addRecordForm">
        <TextField
          label="Strategy Title"
          value={strategyTitle}
          onChange={(e) => setstrategyTitle(e.target.value)}
          variant="outlined"
        />
        <br />
        <TextField
          // label="Decision Date"
          type="date"
          value={decisionDate}
          onChange={(e) => setdecisionDate(e.target.value)}
          variant="outlined"
        />
        <br />
        <TextField
          label="ombInitiative"
          value={ombInitiative}
          onChange={(e) => setombInitiative(e.target.value)}
          variant="outlined"
        />
        <br />
        <TextField
          label="useOfSavingsAvoidance"
          value={useOfSavingsAvoidance}
          onChange={(e) => setuseOfSavingsAvoidance(e.target.value)}
          variant="outlined"
        />
        <br />
        <TextField
          label="amount Type"
          value={amountType}
          onChange={(e) => setamountType(e.target.value)}
          variant="outlined"
        />
        <br />
        <Button type="submit" className="commonbtn" variant="contained">
          Add Record
        </Button>
      </form>
    </div>
  );
};

export default AddRecord;
