import Card from "./shared/Card";
import PropTypes from "prop-types";
import { FaTimes } from "react-icons/fa";

interface Item {
  id: number;
  rating: number;
  text: string;
}

interface Props {
  item: Item;
  handleDelete: Function;
}

function FeedbackItem({ item, handleDelete }: Props) {
  return (
    <Card>
      <div className="num-display">{item.rating}</div>
      <button className="close" onClick={() => handleDelete(item.id)}>
        <FaTimes color="purple" />
      </button>
      <div className="text-display">{item.text}</div>
    </Card>
  );
}

FeedbackItem.propTypes = {
  item: PropTypes.object.isRequired
};

export default FeedbackItem;
