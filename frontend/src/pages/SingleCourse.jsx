import { useParams } from 'react-router-dom'

const SingleCourse = () => {
  const { category } = useParams();

  return (
    <section className='cont my-24'>
      <h1>SingleCourse Page</h1>
      <p>Course Category: {category}</p>
    </section >
  );
}

export default SingleCourse;
