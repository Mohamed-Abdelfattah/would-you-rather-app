import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';
import { Tab, Tabs } from '@mui/material';
import QuestionItem from './QuestionItem';
import classes from './QuestionsList.module.css';

const filterQuestaions = (questionsArray, filterAsSpecificCriteria, userId) => {
  // this function returns a new array containing questions based on if it was answered or not and requires the array to be sorted and the active user id to identify if he answered the question and type of filtering (answered or not)
  if (filterAsSpecificCriteria) {
    return questionsArray.filter(
      (question) =>
        question.optionOne.votes.includes(userId) ||
        question.optionTwo.votes.includes(userId)
    );
  } else {
    return questionsArray.filter(
      (question) =>
        !(
          question.optionOne.votes.includes(userId) ||
          question.optionTwo.votes.includes(userId)
        )
    );
  }
};

const QuestionsList = (props) => {
  //
  const questionsList = useSelector((state) => state.questions.questionsList);
  const user = useSelector((state) => state.users.activeUser);

  const { path } = useRouteMatch();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  let filterAsAnswered = query.get('filter') === 'answered' || false;
  let currentTab = `${path}?filter=unanswered`;

  //
  const filteredQuestions = filterQuestaions(
    questionsList,
    filterAsAnswered,
    user.id
  );

  return (
    <Fragment>
      <Tabs value={currentTab} className={classes.sorting}>
        <Tab
          label="UnAnswered Questions"
          value="/inbox/:id"
          to={`${path}?filter=unanswered`}
          component={Link}
          className={!filterAsAnswered ? classes.active : ''}
        />
        <Tab
          label="Answered Questions"
          value="/drafts"
          to={`${path}?filter=answered`}
          component={Link}
          className={filterAsAnswered ? classes.active : ''}
        />
      </Tabs>

      <ul className={classes.list}>
        {filteredQuestions.map((question) => (
          <QuestionItem key={question.id} questionData={question} />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuestionsList;
