import React, { useEffect, useState } from 'react'
import { Layers, ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'

const ActionBtns = () => {
  const [showDemos, setShowDemos] = useState(false)

  useEffect(() => {
    if (showDemos) {
      alert('show demos')
    }
  }, [showDemos])

  return (
    <div className="fixed z-50 right-0 top-40 flex flex-col space-y-1">
      {/* Demos Button */}
      <button
        onClick={() => setShowDemos(!showDemos)}
        title="Demos"
        className="flex flex-col items-center gap-2 px-3 py-2 bg-white hover:bg-black text-black hover:text-white shadow-lg hover:shadow-2xl bg-smooth color-smooth text-[10px] tracking-tighter font-semibold"
      >
        <Layers  />
        <span>Demos</span>
      </button>

      {/* Buy Now Link */}
      <a
        href="https://1.envato.market/Yx2YR"
        title="Buy Now"
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center gap-2 px-3 py-2 bg-white hover:bg-black text-black hover:text-white shadow-lg hover:shadow-2xl bg-smooth color-smooth text-[10px] tracking-tighter font-semibold"
      >
        <ShoppingCart  />
        <span>Buy Now</span>
      </a>
    </div>
  )
}

export default ActionBtns
