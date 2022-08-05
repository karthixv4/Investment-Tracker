import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { fetchRecordById } from "../../reducers/recordSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router";
import "./record.css";
import { fetchArrange } from "../../reducers/arrangeSlice";
import { Latest, Oldest, Default } from "../../reducers/arrangeSlice";
import { useParams } from "react-router";

const Records = () => {
  var afterFilter = useSelector((state) => state.arrange.records);
  const [load, setLoad] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    console.log("hello");
    dispatch(fetchArrange(id));
  }, [id]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.value === "Latest") {
      dispatch(Latest(afterFilter));
    } else if (e.target.value === "Oldest") {
      dispatch(Oldest(afterFilter));
    }
  };
  return (
    <>
      <div>
        <select
        id="select"
          placeholder="select"
          name="records"
          className="selectcustom"
          onChange={handleChange}
        >
          <option value="Latest">View latest records</option>
          <option value="Oldest">View old records</option>
        </select>
        <div className="cardContainer" id="display">
          {afterFilter.map((ele) => (
            <div className="container" key={ele.strategyId}>
              <Card className="customCard" sx={{ maxWidth: 345 }}>
                <CardContent>
                  <h3 component="div" className="strategyTitile1">
                    {ele.strategyTitle}
                  </h3>
                  <Typography variant="body2" color="text.secondary">
                    Decision date: {ele.decisionDate}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ombInitiative: {ele.ombInitiative}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    uosa: {ele.useOfSavingsAvoidance}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Amount Type: {ele.amountType}
                  </Typography>
                </CardContent>
                <CardActions>
                  {/* <Button
                  size="small"
                  value={ele.strategyId}
                  onClick={(e) => {
                    dispatch(fetchRecordById(e.target.value));
                    navigate(`/update`);
                  }}
                >
                  Update
                </Button> */}

                  <Button
                    size="small"
                    className="strategybtn"
                    value={ele.strategyId}
                    onClick={(e) => {
                      dispatch(fetchRecordById(e.target.value));
                      navigate(`/view/${ele.strategyId}`);
                    }}
                  >
                    View More
                  </Button>
                  {/* <Button
                size="small"
                value={ele.strategyId}
                onClick={(e) => {
                  setClick(e.target.value);
                  dispatch(fetchRecordById(e.target.value));
                }}
              >
                Keys
              </Button> */}
                </CardActions>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Records;
