import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      // Check if userData exists in local storage and is not null
      const storedUserData = localStorage.getItem("userData");
      if (storedUserData && storedUserData!== "null") {
        // If userData exists and is not null, load it into the Redux state
        state.userData = JSON.parse(storedUserData);
      } else {
        // If userData does not exist in local storage or is null, proceed as before
        localStorage.setItem("userData", JSON.stringify(action.payload));
        state.userData = action.payload;
      }
    },
    setLogout: (state) => {
      localStorage.clear();
      state.userData = null;
    },
  },
});

export const { setUserData, setLogout } = userSlice.actions;

export default userSlice.reducer;
