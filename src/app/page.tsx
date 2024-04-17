'use client';
import SearchForm from '@/components/SuspenseWrapper'
import { Suspense } from 'react';
import { LuLoader2 } from 'react-icons/lu';

const LocationPage = () => {
  return (
    <Suspense fallback={<LuLoader2 size={50} className='animate-spin' />}>
      <SearchForm />
    </Suspense>
  );
};

export default LocationPage;
