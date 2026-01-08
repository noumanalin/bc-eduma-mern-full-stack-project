import { Link } from 'react-router-dom'

const AppPromotion = () => {
  return (
    <article className='cont rounded-xl py-14 flex flex-col md:flex-row gap-8 bg-[#dfefff] items-center my-15'>
      {/* 1. content section */}
      <div className="flex-1 space-y-6 md:ml-10">
        <header className="relative text-xl font-bold text-[#2d2d2d] pb-2">
          Eduma Mobile App
          <div className="absolute bottom-0 left-0 w-full h-2 bg-[url('/underline.png')] bg-no-repeat bg-left-bottom" />
        </header>
        
        <h4 className="text-4xl font-bold text-[#4a4a4a]">
          Online learning now in your<br />fingertips
        </h4>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/" className="block">
            <img 
              src="/app-store.svg" 
              alt="Download on the App Store" 
              className="h-12 md:h-14 w-auto"
            />
            <span className="sr-only">Download on the App Store</span>
          </Link>
          <Link to="/" className="block">
            <img 
              src="/play-store.svg" 
              alt="GET IT ON Google Play" 
              className="h-12 md:h-14 w-auto"
            />
            <span className="sr-only">GET IT ON Google Play</span>
          </Link>
        </div>
      </div>

      {/* 2. media section */}
      <div className="relative flex-1 center-center md:gap-30">
        <img 
          src="/arrow-style.png" 
          alt="" 
          className="absolute w-[90px] h-auto top-10 left-0 -translate-x-1/2 rotate-[-30deg]"
        />

        <figure className="flex justify-center w-[250px] h-[280px]">
          <img 
            src="/app.png" 
            alt="Eduma mobile app screens" 
            className="w-full max-w-md md:max-w-lg h-auto"
          />
        </figure>
      </div>
    </article>
  )
}

export default AppPromotion