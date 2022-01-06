import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import classes from './QuestionItem.module.css';

const QuestionItem = (props) => {
  //
  const users = useSelector((state) => state.users);

  return (
    <li className={classes.item}>
      <figure>
        <blockquote>
          <p>
            {props.questionData.optionOne.text.substring(0, 13)}...{' '}
            <span>OR</span> {props.questionData.optionTwo.text.substring(0, 13)}
            ...
          </p>
        </blockquote>
        <figcaption>
          {users.usersDict[props.questionData.author].name}
        </figcaption>
      </figure>
      <Link to={`/questions/${props.questionData.id}`} className="btn">
        View Question
      </Link>
    </li>
  );
};

export default QuestionItem;
