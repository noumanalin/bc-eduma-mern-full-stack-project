import ProgressiveSlider from './ProgressiveSlider';
import { instructors } from '../contants/appData';
import InstructorCard from './cards/InstructorCard';

const InstructorTeam = () => {
  return (
    <section className='text-center'>
        <h4 className='uppercase text-[#555555] font-semibold'>our instructor</h4>
        <h3 className='text-4xl font-bold mb-14'>Professional <span className='text-[var(--primary-color)]'>instructor</span>team</h3>
        {
        <ProgressiveSlider  slidesToShow={4} dataLength={instructors.length} link="/all-instructors" linkText="View All Instructors">
            {instructors.map((instructor, idx) => (
              <InstructorCard key={idx} data={instructor} />
            ))}
        </ProgressiveSlider>
        }
    </section>
  )
}

export default InstructorTeam