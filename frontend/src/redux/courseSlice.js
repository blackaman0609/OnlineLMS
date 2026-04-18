import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  creatorCourseData: [],
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    // set all courses (used when fetching)
    setCreatorCourseData: (state, action) => {
      state.creatorCourseData = action.payload;
    },

    // update courses (used after edit/delete)
    setCourseData: (state, action) => {
      state.creatorCourseData = action.payload;
    },

    // clear data on logout
    logoutCourse: (state) => {
      state.creatorCourseData = [];
    },
  },
});

export const {
  setCreatorCourseData,
  setCourseData,
  logoutCourse,
} = courseSlice.actions;

export default courseSlice.reducer;