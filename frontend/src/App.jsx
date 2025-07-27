import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom'

import PublicRoutes from './helpers/routes/PublicRoutes.jsx'
import UserRoutes from './helpers/routes/UserRoutes.jsx'
import AdminRoutes from './helpers/routes/AdminRoutes.jsx'

import Header from './components/Header.jsx'
import ActionBtns from './components/utils/ActionBtns.jsx'
import ScrollProgressCircle from './components/utils/ScrollProgressCircle.jsx';
import Loading from './components/utils/Loading.jsx';
import NotFound from './pages/NotFound.jsx';
import ScrollToTop from './components/utils/ScrollToTop.jsx';

const Home = lazy(() => import('./pages/Home.jsx'));
const Login = lazy(() => import('./pages/Login.jsx'));
const Signup = lazy(() => import('./pages/Signup.jsx'));
const Courses = lazy(() => import('./pages/Courses.jsx'));
const Pages = lazy(() => import('./pages/Pages.jsx'));
const Blogs = lazy(() => import('./pages/Blogs.jsx'));
const BackendDemo = lazy(() => import('./pages/BackendDemo.jsx'));
const Footer = lazy(()=> import('./components/Footer.jsx'));
const SingleCourse = lazy(() => import('./pages/SingleCourse.jsx'));

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AllInstructorsPage from './pages/AllInstructorsPage .jsx';



const App = () => {
  return (
    <>
    <Header/>
    <main>
      <Suspense fallback={<Loading/>}>
      <ScrollToTop/>
      <Routes>
          {/* Public Routes */}
            <Route path="/" element={<Home/>} />
            <Route path="/courses" element={<Courses/>} />
            <Route path="/pages" element={<Pages/>} />
            <Route path="/blogs" element={<Blogs/>} />
            <Route path="/backend-demo" element={<BackendDemo/>} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} /> 
            <Route path='/course/:category' element={<SingleCourse/>} />
            <Route path='/all-instructors' element={<AllInstructorsPage/>} />
            <Route path="*" element={<NotFound />} />

          {/* User Protected Routes */}
          <Route element={<UserRoutes/>}>

          </Route>

          {/* Admin Protected Routes */}
          <Route element={<AdminRoutes/>}>

          </Route>

      </Routes>
      </Suspense>

      <ActionBtns/>
      <ScrollProgressCircle/>
    </main>
    <Suspense fallback={<Loading/>}>
      <Footer/>
    </Suspense>
    </>
  )
}

export default App
