import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/solid'

export const Header = () => {
  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="navigation">
          <div className="flex lg:flex-1">
            <Link href="#" className="p-1.5">
              <span className="sr-only">Red Feminista Antimilitarista</span>
              <Image
                className="h-auto w-auto"
                src="/logoRedFeministaAntimilitarista.png"
                alt="logo red feminista antimilitarista"
                width={135}
                height={50}
              />
            </Link>
          </div>

          <div className="flex lg:flex-1 lg:justify-end">
            <Button className='bg-primary'>
              Logout <ArrowRightStartOnRectangleIcon />
            </Button>
          </div>
        </nav>
      </header>
    </div>
  )
}
