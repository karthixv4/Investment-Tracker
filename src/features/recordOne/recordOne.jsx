import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { fetchRecordById } from "./../../reducers/recordSlice";
import "./recordOne.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import { updateRecord } from "./../../reducers/recordSlice";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const RecordOne = () => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  let filters = (keys) => {
    return keys.startsWith("fy");
  };
  const record = useSelector((state) => state.records.record);

  let all = [];
  const check = (obj) => {
    Object.keys(record)
      .filter(filters)
      .forEach((val) => {
        all.push({
          val: val.split("fy"),
          amount: record[val].amount,
          type: record[val].netOrGross,
        });
      });
  };
  check(record);
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(fetchRecordById(id));
  }, [open]);

  //UPDATE FORM

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen2 = () => {
    setValue("");
    setYear("");
    setExpense("");
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };
  let handleForm = (e) => {
    e.preventDefault();

    let strategy = record;
    strategy = {
      ...strategy,
      strategyTitle: strategyTitle,
      decisionDate: decisionDate,
      ombInitiative: ombInitiative,
      useOfSavingsAvoidance: useOfSavingsAvoidance,
      amountType: amountType,
    };
    dispatch(updateRecord(strategy));
    handleClose();
  };
  const [strategyTitle, setstrategyTitle] = useState("");
  const [decisionDate, setdecisionDate] = useState("");
  const [ombInitiative, setombInitiative] = useState("");
  const [useOfSavingsAvoidance, setuseOfSavingsAvoidance] = useState("");
  const [amountType, setamountType] = useState("");

  useEffect(() => {
    setstrategyTitle(record.strategyTitle);
    setdecisionDate(record.decisionDate);
    setombInitiative(record.ombInitiative);
    setuseOfSavingsAvoidance(record.useOfSavingsAvoidance);
    setamountType(record.amountType);
  }, [record]);
  //END UPDATE FORM
  //ADD INVESTMENT FORM
  const [value, setValue] = useState("Net");
  const [year, setYear] = useState("");
  const [expense, setExpense] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleForm2 = (e) => {
    e.preventDefault();
    let strategy = record;
    strategy = {
      ...strategy,
      ["fy" + year]: {
        amount: parseInt(expense),
        netOrGross: value,
      },
    };
    console.log(strategy);
    dispatch(updateRecord(strategy));
    handleClose2();
  };
  useEffect(() => {
    dispatch(fetchRecordById(id));
  }, [open2]);
  //END ADD INVESTMENT FORM

  return (
    <>
      <div className="main">
        <Card sx={{ maxWidth: 645 }} className="card">
          <CardContent>
            <h3>
              {record.strategyTitle}
              </h3>
            <div className="details">
              <Typography
                variant="body2"
                type="date"
                color="text.secondary"
                sx={{ maxWidth: 445 }}
              >
               <b> Decision Date:</b> {record.decisionDate}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ maxWidth: 445 }}
              >
                <b>ombInitiative: </b>{record.ombInitiative}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ maxWidth: 445 }}
              >
               <b> Savings Avoid:</b> {record.useOfSavingsAvoidance}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ maxWidth: 445 }}
              >
               <b> Amount Type: </b>{record.amountType}
              </Typography>
            </div>
          </CardContent>
          <CardActions className="buttons">
            <Button size="small" className="commonbtn" onClick={handleClickOpen}>
              Update Record
            </Button>
            <Button size="small" className="commonbtn" onClick={handleClickOpen2}>
              Add Investment
            </Button>
          </CardActions>
        </Card>

        
        <h4>Investments Made</h4>
        <BarChart
          className="graph"
          width={700}
          height={400}
          data={all}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="val[1]" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey={"amount"} fill="#8884d8" />
          <Bar dataKey={"type"} fill="#82ca9d" />
        </BarChart>
      </div>
      {/* UPDATE FROM */}

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Update " + record.strategyTitle + " ?"}</DialogTitle>
    
          <DialogContent>

            <DialogContentText
            
              id="alert-dialog-slide-description"
              component={"span"}
            >
                  <form onSubmit={handleForm}>
              <TextField
                label="Strategy Title"
                value={strategyTitle || ""}
                onChange={(e) => setstrategyTitle(e.target.value)}
                variant="outlined"
              />
              <br />
              <TextField
                label="Decision Date"
                value={decisionDate || ""}
                onChange={(e) => setdecisionDate(e.target.value)}
                variant="outlined"
              />
              <br />
              <TextField
                label="ombInitiative"
                value={ombInitiative || ""}
                onChange={(e) => setombInitiative(e.target.value)}
                variant="outlined"
              />
              <br />
              <TextField
                label="useOfSavingsAvoidance"
                value={useOfSavingsAvoidance || ""}
                onChange={(e) => setuseOfSavingsAvoidance(e.target.value)}
                variant="outlined"
              />
              <br />
              <TextField
                label="amount Type"
                value={amountType || ""}
                onChange={(e) => setamountType(e.target.value)}
                variant="outlined"
              />
              <br />

              <Button type="submit" variant="contained">
               update
              </Button>
              </form>
               <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {/* <Button type="submit">Update</Button> */}
        </DialogActions>
            </DialogContentText>
          </DialogContent>
      
       
      </Dialog>
      {console.log(all)}
      {/* END UPDATE FORM */}
      {/* ADD INVESTMENT */}
      <Dialog
        open={open2}
        TransitionComponent={Transition}
        
        onClose={handleClose2}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Add Investment"}</DialogTitle>
        <form onSubmit={handleForm2} className="customform">
          <DialogContent>
            <DialogContentText
              id="alert-dialog-slide-description"
              component={"span"}
            >
              <TextField
                label="Financial Year"
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                variant="standard"
              />
              <br />
              <TextField
                label="Expense"
                value={expense}
                onChange={(e) => setExpense(e.target.value)}
                type="number"
                variant="standard"
              />
              <br />
              <FormControl>
                <FormLabel id="demo-controlled-radio-buttons-group">
                  Net or Gross
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={value}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="Net"
                    control={<Radio />}
                    label="Net"
                  />
                  <FormControlLabel
                    value="Gross"
                    control={<Radio />}
                    label="Gross"
                  />
                </RadioGroup>
              </FormControl>
              <br />

              <br />
              <Button type="submit" variant="contained" className="commonbtn">
                Add Record
              </Button>
            </DialogContentText>
          </DialogContent>
        </form>
        <DialogActions>
          <Button onClick={handleClose2}>Cancel</Button>
        </DialogActions>
      </Dialog>
      {/* END ADD INVESTMENT */}
    </>
  );
};

export default RecordOne;
