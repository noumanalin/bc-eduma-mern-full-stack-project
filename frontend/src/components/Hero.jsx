import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeUp } from '../contants/motion';

const Hero = () => {
  return (
    <motion.section 
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      
      className='cont fadeUp mx-auto px-4 py-8 md:py-12 flex-bc flex-col md:flex-row gap-8 md:gap-6 my-6'>
      {/* 1. Hero content */}
      <div className='flex-1 space-y-4 md:space-y-6'>
        <div className="space-y-4">
          <h3 className='font-semibold text-xl uppercase tracking-tight text-gray-600'>SPECIAL DEAL FOR USERS</h3>
          <h1 className='text-3xl md:text-[60px] font-bold leading-tight'>
            Enjoy over <span className='text-[var(--primary-color)]'>1.2K courses</span><br />
            for creatives for <span className='text-green-600'>free</span>
          </h1>
          <Link 
            to='/courses' 
            className='inline-block w-[218px] text-center py-4 bg-[var(--primary-color)] text-white rounded-md hover:bg-blue-600 transition-colors duration-300 font-medium'
          >
            Explore Course Packages
          </Link>
        </div>
      </div>
      
      {/* 2. Hero Media */}
      <div className="">
        <figure className='relative'>
          <img 
            className='w-full max-w-[550px]' 
            src="/banner-learning.webp" 
            alt="hero banner learning image" 
            loading='lazy'
          />
          <motion.div
            animate={{ y: [0, 10] }} 
            transition={{
              duration: 1,           
              repeat: Infinity,      
              repeatType: "reverse", 
              ease: "easeIn"      
            }}
            className='absolute bottom-36 left-1 lg:-left-10 bg-white py-4 pr-16 pl-3 rounded-lg shadow-md center-center gap-4'>
            <span className='text-3xl font-bold rounded-full px-4 text-gray-100 bg-amber-400'>4.85</span>
            <div className="space-y-1">
              <h3 className='text-base font-semibold  text-gray-900'>Average Rating</h3>
              <p className=' font-medium text-gray-600 '>183,406 Learner reviews</p>
            </div>
          </motion.div>
        </figure>
      </div>
    </motion.section>
  );
};

export default Hero;