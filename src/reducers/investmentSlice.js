import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  records: [],
  year: "",
  startDate: "",
  endDate: "",
  years: [],
};

const YearFilter = createSlice({
  name: "YearFilter",
  initialState,
  reducers: {
    Bring: (state, action) => {
      state.records = [];
      const { record, year } = action.payload;
      let dates = (keys) => {
        return keys.startsWith("fy");
      };
      //console.log(record);
      record.map((ele) => {
        Object.keys(ele)
          .filter(dates)
          .forEach((val) => {
            let vc = val.split("fy");
            if (vc[1] == year) {
              state.records.push({
                title: ele.strategyTitle,
                year: vc[1],
                amount: ele[val].amount,
                type: ele[val].netOrGross,
              });
            }
          });
      });
    },
    GetYears: (state, action) => {
      state.years = [];
      let records = action.payload;
      let dates = (keys) => {
        return keys.startsWith("fy");
      };
      let Allyears = [];
      records.map((ele) => {
        Object.keys(ele)
          .filter(dates)
          .forEach((val) => {
            let vc = val.split("fy");
            Allyears.push(vc[1]);
          });
      });

      let removeDuplicates = (arr) => {
        return [...new Set(arr)];
      };
      state.years = removeDuplicates(Allyears);
    },
    StartDate: (state, action) => {
      state.startDate = new Date(action.payload).getTime();
    },
    EndDate: (state, action) => {
      state.endDate = new Date(action.payload).getTime();
    },
    RangeData: (state, action) => {
      state.records = [];
      var ac = state.startDate;
      var bc = state.endDate;
      let dates = (keys) => {
        return keys.startsWith("decision");
      };
      let dates2 = (keys) => {
        return keys.startsWith("fy");
      };
      let records = action.payload;
      records.map((ele) => {
        Object.keys(ele)
          .filter(dates)
          .forEach((val) => {
            let vc = new Date(ele[val]).getTime();
            if (vc >= ac && vc <= bc) {
              let cv = new Date(ele[val]).getFullYear();
              let Tamount = 0;
              Object.keys(ele)
                .filter(dates2)
                .forEach((val) => {
                  Tamount += ele[val].amount;
                  // console.log(Tamount);
                });
              state.records.push({
                title: ele.strategyTitle,
                year: new Date(ele[val]).getFullYear(),
                amount: Tamount,
                type: "",
              });
              console.log(state.records);
              //   state.records.push(ele);
              //   console.log(new Date(ele[val]).getFullYear());
            }
          });
      });
    },
  },
});
export const { Bring, GetYears, StartDate, EndDate, RangeData } =
  YearFilter.actions;
export default YearFilter.reducer;
