import { createContext, useState } from "react";
import { Feedback } from "../components/FeedbackItem";

interface Context {
  feedback: Feedback[];
  addFeedback: Function;
  deleteFeedback: Function;
}

const FeedbackContext = createContext<Context>({
  feedback: [],
  addFeedback: () => {},
  deleteFeedback: () => {}
});
export const FeedbackProvider = ({ children }: any) => {
  const addFeedback = (newFeedback: Feedback) => {
    setFeedback([newFeedback, ...feedback]);
  };

  const deleteFeedback = (id: string) => {
    if (window.confirm("Are you sure you want to delete?"))
      setFeedback(feedback.filter((item) => item.id !== id));
  };

  const [feedback, setFeedback] = useState<Feedback[]>([
    {
      id: "77c0f978-dfe8-4fb2-8404-315039311d80",
      rating: 10,
      text: "This item is from context"
    }
  ]);
  return (
    <FeedbackContext.Provider value={{ feedback, addFeedback, deleteFeedback }}>
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
