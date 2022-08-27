import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  records: [],
};
export const fetchArrange = createAsyncThunk("fetchForArrange", (id) => {
  console.log(id);
  return fetch("https://my-json-server.typicode.com/karthixv4/data/strategies").then((response) =>
    response.json()
  );
});

const Arrange = createSlice({
  name: "Arrange",
  initialState,
  reducers: {
    Latest: (state, action) => {
      let record = action.payload;
      var temp_records_descending = [];
      temp_records_descending = record.slice().sort(function (a, b) {
        var c = new Date(a.decisionDate);
        var d = new Date(b.decisionDate);
        return d - c;
      });
      state.records = temp_records_descending;
    },
    Oldest: (state, action) => {
      let record = action.payload;
      var temp_records_ascending = [];
      temp_records_ascending = record.slice().sort(function (a, b) {
        var c = new Date(a.decisionDate);
        var d = new Date(b.decisionDate);
        return c - d;
      });
      state.records = temp_records_ascending;
    },
    Default: (state, action) => {
      state.records = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchArrange.fulfilled, (state, action) => {
      state.loading = false;
      state.records = action.payload;
    });
  },
});
export default Arrange.reducer;
export const { Latest, Oldest, Default } = Arrange.actions;
