"use client"

import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { FaShoppingCart } from "react-icons/fa"
import useCartStore from '../cartStore'
import Link from 'next/link'
import { MdLocalShipping } from 'react-icons/md'

const Header = () => {
  // const { totalItems } = useCartStore()
  const totalItems = useCartStore((state) => state.totalItems)
  return (
    <div className="p-3 border-b-2 border-[#F5F3FF]">
      <div className="max-w-7xl mx-auto flex justify-between">
        <Link href="/">
          <div className="flex items-center cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-store"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/><path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7"/></svg>
            <h1 className="ml-2 text-2xl lg:text-3xl font-bold">Artistry Market</h1>
          </div>
        </Link>

        <div className="flex items-center relative">
          <Link href="/cart">
            <FaShoppingCart className="text-3xl text-[#5B20B6] cursor-pointer" />
          </Link>
          { totalItems > 0 && (
            <div className="ml-2 bg-blue-500 rounded-full w-5 h-5 flex items-center text-white text-sm font-semibold justify-center">
              { totalItems }
            </div>
          )}

          <Link className="ml-4" href="/order">
            <MdLocalShipping className="text-3xl text-[#5B20B6] cursor-pointer hover:scale-125 transition-transform duration-300" />
          </Link>

          <div className="ml-4">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>
    </div>
  )
}


export default Header