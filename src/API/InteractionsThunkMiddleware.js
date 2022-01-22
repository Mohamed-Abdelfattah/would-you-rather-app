import { questionsActions } from '../features/questions/question-slice';
import { statusActions } from '../features/UI/status-slice';
import { usersActions } from '../features/users/users-slice';
import {
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
  _getUsers,
} from './_DATA';

// const { data, error, status, sendRequest } = useRequestAPI(_getQuestions, true);
//this eror "React Hook "useRequestAPI" cannot be called at the top level. React Hooks must be called in a React function component or a custom React Hook function"
// happened so to make the spinner work the logic in useRequestAPI should be extracted and written here

export const fetchAndPopulateUsers = () => {
  return async (dispatch) => {
    //
    dispatch(statusActions.pending());
    try {
      const data = await _getUsers();
      dispatch(usersActions.populateUsers(data));
      dispatch(statusActions.success());
    } catch (err) {
      dispatch(statusActions.error(err.message));
    }
  };
};

export const fetchAndPopulateQuestions = () => {
  return async (dispatch) => {
    //
    dispatch(statusActions.pending());
    try {
      const data = await _getQuestions();
      // .then((data) => {
      const dataArray = [];
      for (let key in data) {
        dataArray.push(data[key]);
      }
      //   console.log(dataArray);
      dataArray.sort((a, b) => b.timestamp - a.timestamp);
      //   console.log(dataArray)
      dispatch(questionsActions.populateState(dataArray));
      dispatch(statusActions.success());
      // }
    } catch (err) {
      dispatch(statusActions.error(err));
    }
  };
};

export const fetchQuetionById = (questionId) => {
  return async (dispatch) => {
    dispatch(statusActions.pending());
    try {
      const data = await _getQuestions();
      // console.log(questionId);
      // console.log(data[questionId]);
      if (!data[questionId]) throw new Error('404! Question Not Found');
      dispatch(questionsActions.setActiveQuestion(data[questionId]));
      dispatch(statusActions.success());
    } catch (err) {
      dispatch(statusActions.error(err.message));
      // console.log('error was catched', err.message);
    }
  };
};

export const questionGotAnswered = (questionId, userId, choice) => {
  return async (dispatch) => {
    dispatch(statusActions.pending());
    try {
      // console.log(
      //   'calling _save fn with params userId, questionId, choice ==> ',
      //   userId,
      //   questionId,
      //   choice
      // );
      await _saveQuestionAnswer({
        authedUser: userId,
        qid: questionId,
        answer: choice,
      });
      dispatch(questionsActions.addAnswer({ userId, questionId, choice }));
      dispatch(usersActions.userAnswered({ userId, questionId, choice }));
      dispatch(statusActions.success());
    } catch (err) {
      dispatch(statusActions.error(err));
    }
  };
};

export const AddNewQuestions = (questionData) => {
  return async (dispatch) => {
    dispatch(statusActions.pending());
    try {
      const newQuestion = await _saveQuestion(questionData);
      // console.log(addedQuestion);
      dispatch(statusActions.success());
      dispatch(questionsActions.addQuestion(newQuestion));
      dispatch(
        usersActions.userAsked({
          questionId: newQuestion.id,
          userId: newQuestion.author,
        })
      );
    } catch (err) {
      dispatch(statusActions.error(err));
    }
  };
};
