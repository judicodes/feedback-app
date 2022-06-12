import React, { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
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
  const { addFeedback } = useContext(FeedbackContext);

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

  useEffect(validateText, [text]);

  const handleTextChange = (event: React.FormEvent<HTMLInputElement>) => {
    setText(event.currentTarget.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim().length >= 10) {
      const newFeedback: Feedback = {
        id: uuidv4(),
        rating,
        text
      };
      addFeedback(newFeedback);
      setText("");
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
