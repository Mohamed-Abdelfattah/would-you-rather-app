import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  questionsList: [],
  wasPopulatedBefore: false,
  activeQuestion: null,
};

const questionSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    addQuestion(state, action) {
      state.questionsList.unshift(action.payload);
    },
    populateState(state, action) {
      state.questionsList.push(...action.payload);
      state.wasPopulatedBefore = true;
    },
    setActiveQuestion(state, action) {
      state.activeQuestion = action.payload;
    },
    addAnswer(state, action) {
      const index = state.questionsList.findIndex(
        (el) => el.id === action.payload.questionId
      );
      state.questionsList[index][action.payload.choice].votes.push(
        action.payload.userId
      );

      state.activeQuestion[action.payload.choice].votes.push(
        action.payload.userId
      );
    },
  },
});

export const questionsActions = questionSlice.actions;

export default questionSlice.reducer;
