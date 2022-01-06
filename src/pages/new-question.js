import { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AddQuestionForm from '../features/questions/AddQuestionForm';
import { AddNewQuestions } from '../API/InteractionsThunkMiddleware';

const NewQuestionPage = (props) => {
  //
  const dispatch = useDispatch();
  const history = useHistory();

  const addQuestionHandler = (formInput) => {
    dispatch(AddNewQuestions(formInput));
    history.push('/home');
  };

  return (
    <Fragment>
      <div>
        <p>Complete the question:</p>
      </div>
      <AddQuestionForm onSubmitQuestion={addQuestionHandler} />
    </Fragment>
  );
};

export default NewQuestionPage;
