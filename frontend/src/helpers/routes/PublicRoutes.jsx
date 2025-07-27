import React from 'react'

const PublicRoutes = () => {
  return (
    <div>PublicRoutes</div>
  )
}

export default PublicRoutes




// const PublicRoutes = () => {
//   const {user, token} = useSelector((state) => state?.user);

//   return user && token ? (
//     <Navigate to="/" />
//   ) : (
//     <div className="bg-gray-200 theme w-full h-screen flex items-center justify-center">
//       <Outlet />
//     </div>
//   );
// };