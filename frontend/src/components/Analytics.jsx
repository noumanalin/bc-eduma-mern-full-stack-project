import { motion } from "framer-motion";
import { fadeUp } from "../contants/motion";
import CounterAnimation from "../helpers/CounterAnimation";

// Sample data
const dataArr = [
  { title: "Student Enrolled", number: 58.6, symbol: "K", color: "text-[#39b500]" },
  { title: "Class Completed", number: 38.6, symbol: "K", color: "text-[#098ce9]" },
  { title: "Satisfaction Rate", number: 98.9, symbol: "%", color: "text-[#edaa00]" },
  { title: "Top Instructors", number: 236, symbol: "K", color: "text-[#af52de]" },
];




const Analytics = () => {
  return (
    <motion.section
      className="cont my-5 grid grid-cols-2 md:grid-cols-4 gap-3"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {dataArr.map((data, index) => (
        <div
          key={index}
          className="h-[135px] center-center py-3 border border-gray-300 rounded-sm shadow-md"
        >
          <div className="text-center">
            <h5 className={`text-3xl font-bold ${data.color}`}>
              <CounterAnimation targetNumber={data.number} symbol={data.symbol} />
            </h5>
            <h2 className="text-xl font-semibold">{data.title}</h2>
          </div>
        </div>
      ))}
    </motion.section>
  );
};

export default Analytics;
