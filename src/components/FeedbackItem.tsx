interface Item {
  id: number;
  rating: number;
  text: string;
}

interface Props {
  item: Item;
}

function FeedbackItem({ item }: Props) {
  return (
    <div className="card">
      <div className="num-display">{item.rating}</div>
      <div className="text-display">{item.text}</div>
    </div>
  );
}

export default FeedbackItem;
