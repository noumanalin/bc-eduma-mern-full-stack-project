import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp } from '../contants/motion';

const dataArr = [
  { id: 1, icon: "/icons/course-icon.svg", title: "short courese", description: 'Acquire new abilities at your own pace with our flexible online courses.' },
  { id: 2, icon: "/icons/tracks-icon.svg", title: "ExpertTracks", description: 'Elevate your expertise with a curated series of specialized courses.' },
  { id: 3, icon: "/icons/microcredentials-icon.svg", title: "Microcredentials", description: 'Achieve recognized professional or academic credentials.' },
];

const LearningOptions = () => {
  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className='bg-[var(--section-bg-color)] my-2 py-12'
    >
      <div className="cont">
        <ul className="flex flex-col md:flex-row gap-8 py-5">
          {dataArr.map((data, index) => (
            <li 
              key={index} 
              className="flex-1 flex items-start gap-4 relative"
            >
              <div className="flex gap-4 w-full">
                {/* Fixed rounded background */}
                <figure className='flex-shrink-0 flex items-center justify-center w-[95px] h-[95px] rounded-full bg-white p-2'>
                  <img 
                    className='object-contain' 
                    height={'50px'}
                    width={'50px'}
                    src={data.icon} 
                    alt="icon" 
                  />
                </figure>
                <div className="flex-1">
                  <h3 className='text-2xl font-bold capitalize tracking-tight text-gray-700'>{data.title}</h3>
                  <p className='text-gray-600'>{data.description}</p>
                </div>
              </div>
              {/* Separator - only between items */}
              {index < dataArr.length - 1 && (
                <span className="hidden md:block w-[1px] h-full bg-gray-300" />
              )}
            </li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
};

export default LearningOptions;