import { MoveLeft } from 'lucide-react';

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <button onClick={onClick}>
      <MoveLeft />
    </button>
  );
};

export default PrevArrow;
