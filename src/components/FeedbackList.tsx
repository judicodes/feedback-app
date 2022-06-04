import FeedbackItem from "./FeedbackItem";

interface Feedback {
  id: number;
  rating: number;
  text: string;
}
interface Props {
  feedback: Feedback[];
}
function FeedbackList({ feedback }: Props) {
  if (!feedback || feedback.length === 0) {
    return <p>No Feedback yet </p>;
  }
  return (
    <div className="feedback-list">
      {feedback.map((item) => (
        <FeedbackItem key={item.id} item={item} />
      ))}
    </div>
  );
}

export default FeedbackList;
