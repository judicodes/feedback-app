import { useState } from "react";
import FeedbackForm from "./components/FeedbackForm";
import { Feedback } from "./components/FeedbackItem";
import FeedbackList from "./components/FeedbackList";
import FeedbackStats from "./components/FeedbackStats";
import Header from "./components/Header";
import FeedbackData from "./data/FeedbackData";

function App() {
  const [feedback, setFeedback] = useState(FeedbackData);

  const addFeedback = (newFeedback: Feedback) => {
    setFeedback([newFeedback, ...feedback]);
  };

  const deleteFeedback = (id: string) => {
    if (window.confirm("Are you sure you want to delete?"))
      setFeedback(feedback.filter((item) => item.id !== id));
  };
  return (
    <>
      <Header />
      <div className="container">
        <FeedbackStats feedback={feedback} />
        <FeedbackForm handleAdd={addFeedback} />
        <FeedbackList feedback={feedback} handleDelete={deleteFeedback} />
      </div>
    </>
  );
}

export default App;
