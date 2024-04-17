import classNames from 'classnames';
import Image from 'next/image';
import { Ref } from 'react';
import { LuLoader2 } from 'react-icons/lu';

interface WeatherSmContainerProps {
  weekday: string;
  temp?: number;
  isToday?: boolean;
  iconUrl?: string;
  dayRef?: Ref<HTMLDivElement>;
}

const WeatherSmContainer = ({
  temp,
  weekday,
  isToday = false,
  iconUrl,
  dayRef = undefined,
}: WeatherSmContainerProps) => {
  return (
    <div
      ref={dayRef}
      className={classNames(
        'px-3 md:px-6 py-3 rounded-2xl min-w-[76px] flex gap-2 flex-col items-center border border-gray-400 transition-all snap-center',
        {
          'border-gray-500': isToday,
        }
      )}
    >
      <p className='font-medium sm:text-lg text-gray-700 uppercase'>
        {weekday}
      </p>
      <div className='flex md:flex-col justify-center items-center gap-2'>
        {!temp ? (
          <LuLoader2 size={25} className='animate-spin' />
        ) : (
          <p className='text-gray-500 text-lg sm:text-xl'>{temp}°</p>
        )}
        {!iconUrl ? (
          <LuLoader2 size={25} className='animate-spin' />
        ) : (
          <Image
            src={`https:${iconUrl}`}
            alt='weather-img'
            width={25}
            height={25}
          />
        )}
      </div>
    </div>
  );
};
export default WeatherSmContainer;
