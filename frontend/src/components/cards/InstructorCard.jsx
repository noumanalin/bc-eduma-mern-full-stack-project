import React from 'react';
import { Link } from 'react-router-dom';

const InstructorCard = ({ data }) => {
  return (
    <div className='border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 mx-3'>
      {/* Image Section */}
      <figure className='relative pt-[100%] bg-gray-100 overflow-hidden'>
        {data.image ? (
          <img 
            src={data.image} 
            alt={data.name} 
            className='absolute top-0 left-0 w-full h-full object-cover'
          />
        ) : (
          <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-200'>
            <span className='text-gray-500 text-lg'>No Image</span>
          </div>
        )}
      </figure>

      {/* Info Section */}
      <div className='p-4 text-center'>
        <h3 className='text-xl font-bold mb-2'>{data.name}</h3>
        <p className='text-gray-600 mb-4'>
          <span className='font-semibold'>{data.students}</span> Students ·{' '}
          <span className='font-semibold'>{data.courses}</span> {data.courses > 1 ? 'Courses' : 'Course'}
        </p>
        
        <Link
          to={`/instructor/${data._id}`}
          className='inline-block font-semibold border border-gray-300 py-2 px-6 rounded-md hover:bg-black hover:text-white hover:border-black transition-all duration-300'
        >
          View Portfolio
        </Link>
      </div>
    </div>
  );
};

export default InstructorCard;