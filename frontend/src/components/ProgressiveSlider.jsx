import React, { useRef, useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, MoveLeft, MoveRight } from "lucide-react";

const ProgressiveSlider = ({ children, link, linkText, slidesToShow = 4, dataLength }) => {
  const [progress, setProgress] = useState(0);
  const sliderRef = useRef(null);

  const settings = {
    arrows: false, // disable default arrows
    infinite: true,
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } }
    ],
    afterChange: (current) => {
      const maxSteps = dataLength - slidesToShow + 1;
      const step = Math.min(current, maxSteps);
      const newProgress = (step / maxSteps) * 100;
      setProgress(newProgress);
    }
  };

  return (
    <section className="cont relative pb-10">
      <Slider ref={sliderRef} {...settings}>
        {children}
      </Slider>

   
      <div className="slider-actions mt-10 flex items-center justify-between gap-5 relative">
        {/* Arrows */}
        <div className="flex gap-2">
          <button
            onClick={() => sliderRef.current?.slickPrev()}
            className="p-2 bg-gray-200 text-gray-500 hover:text-gray-900 transition-colors duration-300 rounded-full"
          >
            <ArrowLeft />
          </button>
          <button
            onClick={() => sliderRef.current?.slickNext()}
            className="p-2 bg-gray-200 text-gray-500 hover:text-gray-900 transition-colors duration-300 rounded-full"
          >
            <ArrowRight />
          </button>
        </div>

        {/* Progress bar */}
        <div className="relative w-full h-[2px] bg-gray-300 rounded overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-gray-800 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Link */}
        {link && (
          <Link
            to={link}
            className="font-semibold border py-2 px-4 rounded-md hover:bg-black hover:text-gray-100 transition-all duration-300 whitespace-nowrap"
          >
            {linkText || 'View All'}
          </Link>
        )}
      </div>
    </section>
  );
};

export default ProgressiveSlider;
