import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//Fetch Records By Id
export const fetchRecordByIds = createAsyncThunk("record/fetchById", (year) => {
  return fetch(`https://my-json-server.typicode.com/karthixv4/data/strategies/`).then((response) =>
    response.json()
  );
});
export const fetchRecordFilter = createAsyncThunk("record/fetchFilter", () => {
  return fetch(`https://my-json-server.typicode.com/karthixv4/data/strategies`).then((response) =>
    response.json()
  );
});
const initialState = {
  loading: false,
  startDate: "",
  endDate: "",
  record: [],
  records: [],
  filterRecord: [],
};
const filter = createSlice({
  name: "filter",
  initialState,
  reducers: {
    StartDate: (state, action) => {
      state.startDate = new Date(action.payload).getTime();
    },
    EndDate: (state, action) => {
      state.endDate = new Date(action.payload).getTime();
    },
    RangeData: (state, action) => {
      state.filterRecord = [];
      console.log(state.startDate);
      var ac = state.startDate;
      var bc = state.endDate;
      let dates = (keys) => {
        return keys.startsWith("decision");
      };
      let records = action.payload;
      records.map((ele) => {
        Object.keys(ele)
          .filter(dates)
          .forEach((val) => {
            let vc = new Date(ele[val]).getTime();
            if (vc >= ac && vc <= bc) {
              state.filterRecord.push(ele);
            }
          });
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRecordByIds.fulfilled, (state, action) => {
      state.loading = false;
      state.record = action.payload;
    });
    builder.addCase(fetchRecordFilter.fulfilled, (state, action) => {
      state.loading = false;
      state.record = action.payload;
    });
  },
});

export const { StartDate, EndDate, RangeData } = filter.actions;
export default filter.reducer;
export const finalFilter = (state) => state.filter.filterRecord;
