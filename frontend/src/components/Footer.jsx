import { ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='bg-[var(--section-bg-color)]'>
        <section className='w-full py-16 bg-[#f1f2f8]'>
            <div className="cont">
                {/* CTA Section */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-10">
                    <h2 className='text-2xl md:text-3xl font-semibold tracking-tight mb-4 md:mb-0'>Sign up to receive our latest updates</h2>
                    <form onSubmit={(e) => {e.preventDefault(); alert('cta form submitted!')}} className='flex flex-col sm:flex-row gap-3 w-full md:w-auto'>
                        <input 
                            type="email" 
                            placeholder='Your email here' 
                            className='bg-white py-3 px-4 rounded-md w-full md:w-[300px] lg:w-[380px]' 
                            required
                        />
                        <button 
                            type='submit' 
                            className='text-center py-3 px-5 bg-[var(--primary-color)] text-white rounded-md hover:bg-[var(--primary-variant-color)] transition-colors duration-300 text-lg font-medium' 
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
                <hr className='opacity-25 my-7'/>
                {/* Footer Grid Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
                    {/* 1 - Get in touch */}
                    <div className="">
                        <h2 className='text-xl font-semibold mb-4'>Get in touch</h2>
                        <ul className='space-y-4'>
                            <li className='flex items-start gap-3'>
                                <figure className='p-2 rounded-full bg-white mt-1'><img src="/phone.svg" alt="phone icon" width={20} height={20} /></figure>
                                <div>
                                    <p className='text-gray-600'>Call us directly?</p>
                                    <strong className='text-gray-900'>+1 234 567 8910</strong>
                                </div>
                            </li>
                            <li className='flex items-start gap-3'>
                                <figure className='p-2 rounded-full bg-white mt-1'><img src="/location.svg" alt="location icon" width={20} height={20} /></figure>
                                <div>
                                    <p className='text-gray-600'>Address</p>
                                    <strong className='text-gray-900'>Howard Street, San Francisco</strong>
                                </div>
                            </li>
                            <li className='flex items-start gap-3'>
                                <figure className='p-2 rounded-full bg-white mt-1'><img src="/mail.svg" alt="mail icon" width={20} height={20} /></figure>
                                <div>
                                    <p className='text-gray-600'>Email</p>
                                    <strong className='text-gray-900'><a href="mailto:contact@eduma.com">contact@eduma.com</a></strong>
                                </div>
                            </li>
                        </ul>
                    </div>
                    
                    {/* 2 - Need some help? */}
                    <div className="">
                        <h2 className='text-xl font-semibold mb-4'>Need some help?</h2>
                        <ul className='space-y-2'>
                            <li><Link to="/faqs" className='text-gray-600 hover:text-[var(--primary-color)] transition-colors'>FAQs</Link></li>
                            <li><Link to="/contact" className='text-gray-600 hover:text-[var(--primary-color)] transition-colors'>Contact</Link></li>
                        </ul>
                    </div>
                    
                    {/* 3 - Popular subjects */}
                    <div className="">
                        <h2 className='text-xl font-semibold mb-4'>Popular subjects</h2>
                        <ul className='space-y-2'>
                            <li><Link to="/subjects/developer" className='text-gray-600 hover:text-[var(--primary-color)] transition-colors'>Developer</Link></li>
                            <li><Link to="/subjects/marketing" className='text-gray-600 hover:text-[var(--primary-color)] transition-colors'>Marketing</Link></li>
                            <li><Link to="/subjects/business" className='text-gray-600 hover:text-[var(--primary-color)] transition-colors'>Business</Link></li>
                            <li><Link to="/subjects/design" className='text-gray-600 hover:text-[var(--primary-color)] transition-colors'>Design</Link></li>
                        </ul>
                    </div>
                    
                    {/* 4 - Social media */}
                    <div>
                        <h2 className='text-xl font-semibold mb-4'>Need some help</h2>
                        <ul className='space-y-3'>
                            <li>
                                <Link to="https://youtube.com" target='_blank' className='flex justify-between items-center text-gray-600 hover:text-[var(--primary-color)] transition-colors'>
                                    <span className='flex items-center gap-3'>
                                        <img src="/youtube.svg" alt="youtube icon" width={16} height={16} />
                                        YouTube
                                    </span>
                                    <span className='text-gray-500 text-sm'>2.3M Subscribe</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="https://facebook.com" target='_blank' className='flex justify-between items-center text-gray-600 hover:text-[var(--primary-color)] transition-colors'>
                                    <span className='flex items-center gap-3'>
                                        <img src="/fb.svg" alt="facebook icon" width={16} height={16} />
                                        Facebook
                                    </span>
                                    <span className='text-gray-500 text-sm'>2.3M Subscribe</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="https://instagram.com" target='_blank' className='flex justify-between items-center text-gray-600 hover:text-[var(--primary-color)] transition-colors'>
                                    <span className='flex items-center gap-3'>
                                        <img src="/insta.svg" alt="instagram icon" width={16} height={16} />
                                        Instagram
                                    </span>
                                    <span className='text-gray-500 text-sm'>2.3M Subscribe</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="https://twitter.com" target='_blank' className='flex justify-between items-center text-gray-600 hover:text-[var(--primary-color)] transition-colors'>
                                    <span className='flex items-center gap-3'>
                                        <img src="/x.svg" alt="twitter icon" width={16} height={16} />
                                        Twitter
                                    </span>
                                    <span className='text-gray-500 text-sm'>2.3M Subscribe</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
        
        {/* Bottom footer */}
        <section className='bg-white py-8'>
            <div className="cont flex flex-col md:flex-row justify-between items-center gap-5">
                {/* 1. Logo */}
                <figure>
                    <img src="/logo-footer.svg" alt="EDUMA logo" width={100} height={40} loading='lazy'/>
                </figure>
                
                {/* 2. Links */}
                <ul className='flex flex-wrap justify-center gap-5 text-gray-600'>
                    <li>
                        <Link to="/terms" className='hover:text-[var(--primary-color)] transition-colors'>Terms of use</Link>
                    </li>
                    <li>
                        <Link to="/privacy" className='hover:text-[var(--primary-color)] transition-colors'>Privacy policy</Link>
                    </li>
                    <li>
                        <Link to="/cookies" className='hover:text-[var(--primary-color)] transition-colors'>Cookies policy</Link>
                    </li>
                </ul>
                
                {/* 3. Copyright text */}
                <p className='text-gray-500 text-sm md:text-base'>© 2025 Eduma. All rights reserved.</p>
                
                {/* 4. Language/Currency selector */}
                <div className='flex gap-3'>
                    <button className='flex items-center gap-1 px-3 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors'>
                        <span>English</span>
                        <ChevronDown size={16}/>
                    </button>
                    <button className='flex items-center gap-1 px-3 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors'>
                  w      <span>USD</span>
                        <ChevronDown size={16}/>
                    </button>
                </div>
            </div>
        </section>
    </footer>
  )
}

export default Footer