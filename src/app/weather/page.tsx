'use client';

import WeatherContainer from '@/components/WeatherContainer';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { LuLoader2 } from 'react-icons/lu';

const WeatherPage = () => {
  return (
    <Suspense fallback={<LuLoader2 size={50} className='animate-spin' />}>
      <WeatherContainer />
    </Suspense>
  );
};

export default WeatherPage;
