import { lazy, Suspense } from 'react'
import Hero from '../components/Hero'
import LearningOptions from '../components/LearningOptions'
import Analytics from '../components/Analytics'
import AppPromotion from '../components/AppPromotion'
import CourseCategories from '../components/CourseCategories'
import ProgressiveSlider from '../components/ProgressiveSlider';
import Faqs from '../components/Faqs.jsx'
import Reviews from '../components/Reviews.jsx'

const ExplorePackages = lazy(()=> import('../components/ExplorePackages'))
const InstructorTeam = lazy(()=> import('../components/InstructorTeam.jsx'))


const data = [
    {img: '/packages/package-01.jpg'},
    {img: '/packages/package-01.jpg'},
    {img: '/packages/package-01.jpg'},
    {img: '/packages/package-01.jpg'},
    {img: '/packages/package-01.jpg'},
    {img: '/packages/package-01.jpg'},
]


const Home = () => {
  return (
   <section>
    <Hero/>
    <LearningOptions/>
    <CourseCategories/>

    <Suspense fallback={<h1 className='text-5xl text-blue-600'>Loading ... </h1>} >
      <ExplorePackages/>
    </Suspense>

    <Faqs />
    
    <Suspense fallback={<h1 className='text-5xl text-blue-600'>Loading ... </h1>} >
      <InstructorTeam/>
    </Suspense>

    <Reviews />
    <Analytics/>
    <AppPromotion/> 
   </section>
  )
}

export default Home