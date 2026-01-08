import { MoveRight } from 'lucide-react';

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <button onClick={onClick}>
      <MoveRight />
    </button>
  );
};

export default NextArrow;
