import React from 'react'
import { Skeleton } from '../ui/skeleton'

export const Loader = () => {
  return (
    <div className='flex flex-col items-center space-y-4'>
      <Skeleton className='h-12  w-full' />
      <Skeleton className='h-12  w-full' />
      <Skeleton className='h-12  w-full' />
      <Skeleton className='h-12  w-full' />
      <Skeleton className='h-12  w-full' />
    </div>
  )
}
