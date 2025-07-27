import { ChevronUp, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';

const ScrollProgressCircle = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [showDownArrow, setShowDownArrow] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (scrollTop / scrollHeight) * 100;

      setScrollProgress(scrolled);
      setIsVisible(scrollTop > window.innerHeight * .3); // Show after 130vh scroll
      setShowDownArrow(scrollTop < scrollHeight * 0.8); // Show down arrow until 80% scrolled
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    if (showDownArrow) {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-5 right-5 w-[45px] h-[45px] rounded-full z-50 shadow-xl flex items-center justify-center bg-gray-200"
      style={{
        background: `conic-gradient(var(--primary-color) ${scrollProgress}%, rgb(229 231 235) ${scrollProgress}%)`,
      }}
      title={showDownArrow ? 'Scroll to bottom' : 'Scroll to top'}
      aria-label={showDownArrow ? 'Scroll to bottom' : 'Scroll to top'}
    >
      <div className="w-[40px] h-[40px] rounded-full bg-white flex items-center justify-center">
        {showDownArrow ? (
          <ChevronDown size={20} className="text-[var(--primary-color)]" strokeWidth={2.5} />
        ) : (
          <ChevronUp size={20} className="text-[var(--primary-color)]" strokeWidth={2.5} />
        )}
      </div>
    </button>
  );
};

export default ScrollProgressCircle;