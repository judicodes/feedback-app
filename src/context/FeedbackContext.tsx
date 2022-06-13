import { createContext, useEffect, useState } from "react";
import { Feedback } from "../components/FeedbackItem";

interface Context {
  feedback: Feedback[];
  itemToEdit: Feedback | null;
  isLoading: boolean;
  addFeedback: (item: Feedback) => void;
  deleteFeedback: (itemId: number | undefined) => void;
  editFeedback: (item: Feedback) => void;
  updateFeedback: (item: Feedback) => void;
  finishEditing: () => void;
}

const FeedbackContext = createContext<Context>({
  feedback: [],
  itemToEdit: null,
  isLoading: true,
  addFeedback: () => {},
  deleteFeedback: () => {},
  editFeedback: () => {},
  updateFeedback: () => {},
  finishEditing: () => {}
});
export const FeedbackProvider = ({ children }: any) => {
  const addFeedback = async (newFeedback: Feedback) => {
    const response = await fetch("/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newFeedback)
    });
    const data = await response.json();
    setFeedback([data, ...feedback]);
  };

  const deleteFeedback = async (id: number | undefined) => {
    if (id && window.confirm("Are you sure you want to delete?")) {
      await fetch(`/feedback/${id}`, { method: "DELETE" });
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [itemToEdit, setItemToEdit] = useState<Feedback | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const response = await fetch("/feedback?_sort=id&_order=desc");
    const data = await response.json();
    setFeedback(data);
    setIsLoading(false);
  }

  const editFeedback = (item: Feedback) => setItemToEdit(item);
  const updateFeedback = async (updatedItem: Feedback) => {
    const response = await fetch(`/feedback/${updatedItem.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedItem)
    });
    const data = await response.json();
    setFeedback(
      feedback.map((item) => (item.id === updatedItem.id ? data : item))
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
        isLoading,
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
