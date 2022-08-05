import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//Fetch ALl records
export const fetchRecords = createAsyncThunk("Records/Fetch", () => {
  return fetch("http://localhost:3002/strategies").then((response) =>
    response.json()
  );
});

//ADDING RECORDS
export const addRecord = createAsyncThunk("Record/Add", (strategy) => {
  fetch(`http://localhost:3002/strategies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      responseType: "json",
    },
    body: JSON.stringify(strategy),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => console.error("Unable to get items.", error));
});
//Fetch Records By Id
export const fetchRecordById = createAsyncThunk("record/fetchById", (id) => {
  return fetch(`http://localhost:3002/strategies/${id}`).then((response) =>
    response.json()
  );
});

export const updateRecord = createAsyncThunk("record/update", (strategy) => {
  console.log("strategy", strategy);
  fetch(`http://localhost:3002/strategies/${strategy.strategyId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(strategy),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    });
});
const initialState = {
  loading: false,
  records: [],
  record: [],
  years: [],
  error: "",
};

const recordReducer = createSlice({
  name: "RecordSlice",
  initialState,
  // reducers: {
  //   getRecords: (state, action) => {
  //     state.startDate = new Date(action.payload).getTime();
  //   },
  // },
  extraReducers: (builder) => {
    builder.addCase(fetchRecords.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchRecords.fulfilled, (state, action) => {
      state.loading = false;
      state.records = action.payload;
      state.error = "";
    });
    builder.addCase(fetchRecords.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(fetchRecordById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchRecordById.fulfilled, (state, action) => {
      state.loading = false;
      state.record = action.payload;
      state.error = "";
    });
    builder.addCase(fetchRecordById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default recordReducer.reducer;
