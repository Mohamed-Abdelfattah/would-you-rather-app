import { configureStore } from '@reduxjs/toolkit';
import statusReducer from '../features/UI/status-slice';
import questionsReducer from '../features/questions/question-slice';
import usersReducer from '../features/users/users-slice';

const store = configureStore({
  reducer: {
    questions: questionsReducer,
    status: statusReducer,
    users: usersReducer,
  },
});

export default store;
