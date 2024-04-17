import { FaQuestion } from 'react-icons/fa';
import { FiCloud, FiCloudRain, FiSun } from 'react-icons/fi';
import { TbMist } from 'react-icons/tb';
import classNames from 'classnames';
import { Ref } from 'react';
import { LuLoader2 } from 'react-icons/lu';
import Image from 'next/image';
type TempState = 'cloudy' | 'sunny' | 'rainy' | 'mist' | 'unknown';

interface TimeWeatherContainerProps {
  time: string;
  temp?: number;
  isNowTime?: boolean;
  timeRef?: Ref<HTMLDivElement>;
  iconUrl?: string;
}

const TimeWeatherContainer = ({
  time,
  temp,
  isNowTime = false,
  timeRef,
  iconUrl = '',
}: TimeWeatherContainerProps) => {
  return (
    <div
      ref={timeRef}
      className={classNames(
        'px-3 md:px-6 py-3 min-h-[85px] rounded-xl flex gap-1/2 flex-col xl:flex-row items-center border border-gray-400 transition-all snap-center justify-center xl:justify-between',
        {
          'border-gray-700': isNowTime,
        }
      )}
    >
      <p className='text-gray-700 text-lg'>{time}</p>
      {!temp ? (
        <>
          <LuLoader2
            size={25}
            className='text-gray-500 hidden xl:block animate-spin'
          />
          <LuLoader2 size={25} className='text-gray-500 animate-spin' />
        </>
      ) : (
        <>
          <Image
            src={`https:${iconUrl}`}
            alt='weather-img'
            width={25}
            height={25}
          />
          <p className='text-gray-500 text-lg sm:text-xl'>{temp}°</p>
        </>
      )}
    </div>
  );
};

export default TimeWeatherContainer;
