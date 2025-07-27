import { Link } from "react-router-dom";
import TrimText from "../../helpers/TrimText";

const PackageCard = ({data}) => {
  return (
    <article className="border mx-2 rounded-md overflow-hidden border-gray-400 h-full grid grid-rows-[auto_1fr]">
        <figure>
            <img src={data.figure} alt="package image" />
        </figure>
        <div className="text-start px-2 py-5">
            <p className=" font-semibold text-[var(--primary-color)]">{data.totalCourses} courses included</p>
            <Link to={data.url} className="font-semibold text-[18px] mb-2 h-[48px] overflow-hidden block">
                <TrimText text={data.packageName} maxlength={60} />  
            </Link>
            <p className="font-semibold">
                <strike className='text-red-900'>${data.price}</strike> {" "} <span className="text-[18px] text-[var(--primary-color)]">{data.discountedPrice}</span>
            </p>
        </div>
    </article>
  )
}

export default PackageCard