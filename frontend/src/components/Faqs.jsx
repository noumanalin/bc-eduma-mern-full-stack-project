import { useState, useRef, useEffect } from "react";
import { faqs } from "../contants/appData";
import { Minus, Plus } from "lucide-react";

const Faqs = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const contentRefs = useRef([]);

  const toggleFaq = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <article className="cont flex flex-col-reverse md:flex-row items-center gap-8 py-12 my-10">
      {/* Text Section */}
      <div className="flex-1 w-full">
        <header className="mb-6">
          <p className="uppercase text-center text-gray-500 font-semibold">Premium Learning</p>
          <h2 className="text-4xl tracking-tighter font-bold my-8">
            State of the art e-Learning{" "}
            <span className="text-[var(--primary-color)]">Experience</span>
          </h2>
        </header>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`transition-all w-full duration-300 rounded-md hover:bg-blue-100 ${
                index === activeIndex
                  ? "bg-blue-100 "
                  : "border-gray-200 "
              }`}
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex justify-between items-center px-4 py-3 text-left font-semibold"
              >
                <span className="text-[18px] font-semibold">{faq.question}</span>
                {index === activeIndex ? (
                  <Minus className="w-5 h-5" />
                ) : (
                  <Plus className="w-5 h-5" />
                )}
              </button>

              <div
                ref={(el) => (contentRefs.current[index] = el)}
                style={{
                  height:
                    index === activeIndex
                      ? contentRefs.current[index]?.scrollHeight + "px"
                      : "0px",
                }}
                className="transition-all duration-500 overflow-hidden px-4 text-sm text-gray-700"
              >
                <div className="py-2">{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Section */}
      <figure className="flex-1 w-full md:w-[630px] max-w-[650px]">
        <img
          src="/faq.png"
          alt="faq banner image"
          className="w-full h-auto object-contain"
        />
      </figure>
    </article>
  );
};

export default Faqs;
