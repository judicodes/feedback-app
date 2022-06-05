import FeedbackItem from "./FeedbackItem";
import PropTypes from "prop-types";

interface Feedback {
  id: number;
  rating: number;
  text: string;
}
interface Props {
  feedback: Feedback[];
  handleDelete: Function;
}
function FeedbackList({ feedback, handleDelete }: Props) {
  if (!feedback || feedback.length === 0) {
    return <p>No Feedback yet </p>;
  }
  return (
    <div className="feedback-list">
      {feedback.map((item) => (
        <FeedbackItem
          key={item.id}
          item={item}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
}

FeedbackList.propTypes = {
  feedback: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      rating: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired
    })
  )
};

export default FeedbackList;
