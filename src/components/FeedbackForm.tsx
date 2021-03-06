import React, { useContext, useEffect, useState } from "react";
import FeedbackContext from "../context/FeedbackContext";
import { Feedback } from "./FeedbackItem";
import RatingSelect from "./RatingSelect";
import Button from "./shared/Button";
import Card from "./shared/Card";

function FeedbackForm() {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(10);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const { addFeedback, updateFeedback, finishEditing, itemToEdit } =
    useContext(FeedbackContext);

  const validateText = () => {
    if (text === "") {
      setButtonDisabled(true);
      setMessage(null);
    } else if (text !== "" && text.trim().length < 10) {
      setButtonDisabled(true);
      setMessage("Text must be at least 10 characters.");
    } else {
      setButtonDisabled(false);
      setMessage(null);
    }
  };

  useEffect(() => {
    if (!!itemToEdit) {
      setRating(itemToEdit.rating);
      setText(itemToEdit.text);
    }
  }, [itemToEdit]);

  useEffect(validateText, [text]);

  const handleTextChange = (event: React.FormEvent<HTMLInputElement>) => {
    setText(event.currentTarget.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim().length >= 10) {
      const newFeedback: Feedback = {
        rating,
        text
      };
      if (!!itemToEdit) {
        const updatedItem = {
          id: itemToEdit.id,
          rating,
          text
        };
        updateFeedback(updatedItem);
        finishEditing();
      } else {
        addFeedback(newFeedback);
      }
      setText("");
      setRating(10);
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us?</h2>
        <RatingSelect
          selectedRating={rating}
          selectRating={(rating: number) => setRating(rating)}
        />
        <div className="input-group">
          <input
            type="text"
            placeholder="Write a review"
            value={text}
            onChange={handleTextChange}
          />
          <Button type="submit" isDisabled={buttonDisabled}>
            Send
          </Button>
        </div>
        {message && <div className="message">{message}</div>}
      </form>
    </Card>
  );
}

export default FeedbackForm;
