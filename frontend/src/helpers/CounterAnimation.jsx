import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const CounterAnimation = ({ targetNumber, symbol }) => {
  const [count, setCount] = useState(0);
  const ref = useRef();
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseFloat(targetNumber);
      const duration = 3000; // Time in seconds
      const increment = end / (duration / 16); // 60fps

      const counter = setInterval(() => {
        start += increment;
        if (start >= end) {
          start = end;
          clearInterval(counter);
        }
        setCount(start.toFixed(1)); // show one decimal
      }, 16);
    }
  }, [isInView, targetNumber]);

  return (
    <span ref={ref}>
      {count}
      {symbol}
    </span>
  );
};

export default CounterAnimation