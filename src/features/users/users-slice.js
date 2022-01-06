import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  usersDict: null,
  activeUser: null,
  wasPopulatedBefore: false,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    login(state, action) {
      state.activeUser = state.usersDict[action.payload];
    },
    populateUsers(state, action) {
      state.usersDict = { ...action.payload };
      state.wasPopulatedBefore = true;
    },
    logout(state) {
      state.activeUser = null;
    },
    userAsked(state, action) {
      state.usersDict[action.payload.userId].questions.push(
        action.payload.questionId
      );
    },
    userAnswered(state, action) {
      state.usersDict[action.payload.userId].answers[
        action.payload.questionId
      ] = action.payload.choice;

      state.activeUser.answers[action.payload.questionId] =
        action.payload.choice;
    },
  },
});

export const usersActions = userSlice.actions;

export default userSlice.reducer;
