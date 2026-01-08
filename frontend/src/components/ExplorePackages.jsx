import ProgressiveSlider from './ProgressiveSlider'
import { packages } from '../contants/appData'
import PackageCard from './cards/PackageCard'

const ExplorePackages = () => {
  return (
    <section className='text-center'>
        <h4 className='uppercase text-[#555555] font-semibold'>our package</h4>
        <h3 className='text-4xl font-bold mb-14'>Explore top <span className='text-[var(--primary-color)]'>packages</span></h3>
        {packages &&
        <ProgressiveSlider  slidesToShow={3} dataLength={packages.length} link="/all-packages" linkText="View All Package">
            {packages.map((data, index)=> <PackageCard key={index} data={data} />)}
        </ProgressiveSlider>
        }
    </section>
  )
}

export default ExplorePackages