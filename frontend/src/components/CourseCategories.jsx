import { Link } from "react-router-dom";

const dataArray = [
  { name: "Business", url: "business" },
  { name: "Design", url: "design" },
  { name: "Developer", url: "developer" },
  { name: "Health", url: "health" },
  { name: "IT", url: "it" },
  { name: "Marketing", url: "marketing" },
  { name: "Photography", url: "photography" },
  { name: "Teaching Online", url: "teaching online" },
  { name: "Technology", url: "technology" },
];

const CourseCategories = () => {
  return (
    <section className="cont bg-[var(--section-bg-color)] my-15 py-12 rounded-md text-center">
      <h4 className="text-xl uppercase tracking-tight text-gray-600 font-semibold">
        Choose from any of these
      </h4>
      <h2 className="text-4xl font-bold mt-5 mb-10">
        Courses <span className="text-[var(--primary-color)]">Categories</span>
      </h2>
      <div className="w-full center-center flex-wrap gap-3">
        {dataArray.map((data, index) => (
          <Link
            to={`/course/${data.url}`} 
            className="p-3 rounded-md capitalize font-semibold border border-transparent hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] transition-colors duration-200 bg-white shadow-sm hover:shadow-md"
            key={index}
          >
            {data.name}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CourseCategories;