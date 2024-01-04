import { createSlice } from "@reduxjs/toolkit";

export const avitProUserSlice = createSlice({
  name: "avitProUser",
  initialState: {
    user: {
      id: 0,
      password: "",
      role: "user",
      email: "",
      name: "",
      surname: "",
      phone: "",
      city: "",
    },
    allUsersFromAPI: [],
    tokens: {},
  },
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
    },
    getAllUsers: (state, action) => {
      state.allUsersFromAPI = action.payload;
    },
    getTokens: (state, action) => {
      state.tokens = action.payload;
    },
  },
});

export const { addUser, getAllUsers, getTokens } = avitProUserSlice.actions;
export default avitProUserSlice.reducer;
