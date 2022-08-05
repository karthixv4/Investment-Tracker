import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const saveUsers = createAsyncThunk("users/save", (user) => {
  fetch(`http://localhost:3002/Users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    });
});

const initialState = {
  loading: false,
  users: [],
  error: "",
};

const registerSlice = createSlice({
  name: "save",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(saveUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(saveUsers.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(saveUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});
export default registerSlice.reducer;
