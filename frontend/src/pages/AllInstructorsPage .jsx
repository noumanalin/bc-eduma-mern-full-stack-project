import InstructorCard from '../components/cards/InstructorCard';
import { instructors } from '../contants/appData'; 

const AllInstructorsPage = () => {
  return (
    <section className="cont py-14">
      <h1 className="text-4xl font-bold text-center mb-12">Our Instructors</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {instructors.map((instructor) => (
          <InstructorCard key={instructor._id} data={instructor} />
        ))}
      </div>
    </section>
  );
};

export default AllInstructorsPage;