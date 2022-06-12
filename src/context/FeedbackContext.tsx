import { createContext, useState } from "react";
import { Feedback } from "../components/FeedbackItem";

interface Context {
  feedback: Feedback[];
  itemToEdit: Feedback | null;
  addFeedback: (item: Feedback) => void;
  deleteFeedback: (itemId: string) => void;
  editFeedback: (item: Feedback) => void;
  updateFeedback: (item: Feedback) => void;
  finishEditing: () => void;
}

const FeedbackContext = createContext<Context>({
  feedback: [],
  itemToEdit: null,
  addFeedback: () => {},
  deleteFeedback: () => {},
  editFeedback: () => {},
  updateFeedback: () => {},
  finishEditing: () => {}
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
  const [itemToEdit, setItemToEdit] = useState<Feedback | null>(null);
  const editFeedback = (item: Feedback) => setItemToEdit(item);
  const updateFeedback = (updatedItem: Feedback) => {
    setFeedback(
      feedback.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };
  const finishEditing = () => {
    setItemToEdit(null);
  };
  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        itemToEdit,
        addFeedback,
        deleteFeedback,
        editFeedback,
        updateFeedback,
        finishEditing
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
