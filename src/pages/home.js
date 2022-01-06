import { Fragment, useEffect } from 'react';
import QuestionsList from '../features/questions/QuestionsList';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAndPopulateQuestions,
  fetchAndPopulateUsers,
} from '../API/InteractionsThunkMiddleware';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const Home = () => {
  //
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.questions);
  const status = useSelector((state) => state.status);
  const users = useSelector((state) => state.users);

  useEffect(() => {
    //
    if (questions.wasPopulatedBefore) return;

    if (!users.wasPopulatedBefore) {
      dispatch(fetchAndPopulateUsers());
    }
    dispatch(fetchAndPopulateQuestions());
  }, []);

  return (
    <Fragment>
      {status.pending && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
      {status.success && <QuestionsList />}
    </Fragment>
  );
};

export default Home;
