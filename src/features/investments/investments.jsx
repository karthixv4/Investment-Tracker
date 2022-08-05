import React from "react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchRecordByIds } from "./../../reducers/filterSlice";
import { useDispatch } from "react-redux";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Bring, GetYears } from "../../reducers/investmentSlice";
import "./investments.css";
import { useParams } from "react-router";
import {
  StartDate,
  EndDate,
  RangeData,
} from "./../../reducers/investmentSlice";
import { fetchArrange } from "../../reducers/arrangeSlice";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  Label,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Investments = () => {
  var record = useSelector((state) => state.arrange.records);
  const years = useSelector((state) => state.year);
  const dispatch = useDispatch();

  const { id } = useParams();
  useEffect(() => {
    dispatch(fetchArrange(id));
  }, [id]);
  useEffect(() => {
    dispatch(GetYears(record));
  }, [record]);

  var ids = 0;
  var display_list = years.records.map((ele) => {
    ids += 1;
    return (
      <div className="container" key={ids}>
        <Card className="customCard" sx={{ maxWidth: 345 }}>
          <CardContent>
            <h5 variant="h5" component="div" className="strategyTitile">
              {ele.title}
            </h5>
            <Typography variant="body2" color="text.secondary">
              <b className="subtitle">Expense</b> {ele.amount}
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  });

  return (
    <div>
      {/* <button onClick={() => dispatch(Bring({ record, year: "2015" }))}>
        fetch
      </button> */}
      <Box sx={{ minWidth: 120 }}>
        <label>
          <h2>Please select year to get the details:</h2>
        </label>
        <select
          name="years"
          className="selectcustom"
          title="select"
          onChange={(e) => dispatch(Bring({ record, year: e.target.value }))}
        >
          {years.years.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        &nbsp;&nbsp;&nbsp;
        <br />
        <br />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(RangeData(record));
          }}
        >
          <input
            className="selectcustom"
            type="date"
            //   value={startDate}
            onChange={(e) => dispatch(StartDate(e.target.value))}
            required
          />
          &nbsp;&nbsp;
          <input
            className="selectcustom"
            type="date"
            onChange={(e) => dispatch(EndDate(e.target.value))}
            required
          />
          &nbsp;&nbsp;
          <button type="submit" className="commonbtn">Get</button>
        </form>
      </Box>
 {/* //GRAF VIEW OF INVESTMENT  */}
      <div>
        <BarChart
          className="graph"
          width={700}
          height={400}
          data={years.records}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={"title"}></XAxis>
          <YAxis />
          <Tooltip />
          <Legend />

          <Bar dataKey={"amount"} fill="#82ca9d" />
          <Bar dataKey={"type"} fill="#8884d8" />
        </BarChart>
      </div>
      <div className="cardContainer">{display_list}</div>
    </div>
  );
};

export default Investments;
