'use client';

import { FiDroplet, FiSearch, FiSun, FiWind } from 'react-icons/fi';
import WeatherSmContainer from './WeatherSmContainer';
import TimeWeatherContainer from './TimeWeatherContainer';
import { useEffect, useRef, useState } from 'react';
import { LuLoader2 } from 'react-icons/lu';
import { WeatherData } from '@/interfaces/WeatherData';
import { useRouter, useSearchParams } from 'next/navigation';

const WeatherContainer = () => {
  const searchParams = useSearchParams();
  const location = searchParams.get('location');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(true);

  const daysCount = 8;

  const [curTime, setCurTime] = useState<Date>(new Date());
  const curTimeRef = useRef<HTMLDivElement>(null);
  const curDayRef = useRef<HTMLDivElement>(null);

  const hours = [];
  for (let i = 0; i < 23; i++) {
    hours[i] = `${('0' + i).slice(-2)}:00`;
  }

  const weekdayNames = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];
  const weekdays = [];
  const curWeekdayIdx = weekdayNames.indexOf(
    curTime.toLocaleDateString('default', { weekday: 'short' }).toUpperCase()
  );
  for (let i = 0; i < daysCount; i++) {
    weekdays[i] = weekdayNames[(curWeekdayIdx + i) % 7];
  }

  useEffect(() => {
    curTimeRef.current?.scrollIntoView({ inline: 'center', block: 'center' });
    curDayRef.current?.scrollIntoView({ inline: 'center', block: 'center' });
  }, [isFetching]);

  const getWeatherData = async () => {
    try {
      const res = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?days=${daysCount}&q=${location}&lang=ru&key=${
          process.env.NEXT_PUBLIC_WEATHER_TOKEN || ''
        }`
      );

      if (res.ok) {
        const weatherData = await res.json();
        if (weatherData) setWeatherData(weatherData);
        setIsFetching(false);
      } else {
        router.push('/?error=true');
      }
    } catch (err) {
      router.push('/?error=true');
    }
  };

  useEffect(() => {
    getWeatherData();
    setInterval(() => {
      setCurTime(new Date());
    }, 1000);
  }, []);

  const router = useRouter();

  let dayState;

  if (curTime.getHours() < 12) {
    dayState = 'Доброе утро!';
  } else if (curTime.getHours() < 18) {
    dayState = 'Добрый день!';
  } else {
    dayState = 'Добрый вечер!';
  }

  return (
    <div className='min-h-96 w-5/6 md:w-3/4 h-[92%] bg-gray-200 rounded-2xl flex flex-col md:flex-row overflow-hidden shadow-2xl'>
      <div className='w-full h-3/4 md:w-3/4 md:h-full p-6 pb-1 sm:p-9 sm:pb-3 md:p-10 flex flex-col items-center transition-md'>
        <div className='w-full flex justify-between lg:px-14'>
          <div
            className='flex gap-1 items-center cursor-pointer transition-all text-gray-450 hover:text-gray-700'
            onClick={() => router.push('/')}
          >
            <FiSearch size={20} />
            {isFetching ? (
              <LuLoader2 className='animate-spin text-gray-500' size={15} />
            ) : (
              <p>{weatherData?.location.name}</p>
            )}
          </div>
          <div className='flex gap-1 justify-center items-center text-gray-700'>
            <FiSun size={20} className='hidden sm:block' />
            <p className='hidden sm:block text-lg'>WeatherApp</p>
          </div>
          <p className='text-gray-700'>
            {curTime.toLocaleDateString('default', {
              day: '2-digit',
              month: 'long',
            })}
          </p>
        </div>
        <div className='flex-1 flex flex-col gap-3 h-full items-center justify-center'>
          <div className='flex gap-2 md:gap-4'>
            {isFetching ? (
              <LuLoader2 className='animate-spin text-gray-500' size={60} />
            ) : (
              <h1 className='font-bold text-gray-500 text-6xl sm:text-7xl md:text-8xl xl:text-9xl'>
                {/* fix as number */}
                {`${Math.round(weatherData?.current.temp_c as number)}°`}
              </h1>
            )}
            <div className='flex flex-col justify-center text-sm md:text-xl'>
              <div className='flex gap-1 items-center text-gray-450'>
                <FiWind />
                {isFetching ? (
                  <LuLoader2 className='animate-spin text-gray-500' size={15} />
                ) : (
                  <p>
                    {weatherData
                      ? Math.round(weatherData?.current.wind_kph / 3.6)
                      : 0}
                  </p>
                )}
                м/с
              </div>
              <div className='flex gap-1 items-center text-gray-450'>
                <FiDroplet />
                {isFetching ? (
                  <LuLoader2 className='animate-spin text-gray-500' size={15} />
                ) : (
                  <p>{weatherData?.current.humidity}</p>
                )}
                %
              </div>
            </div>
          </div>
          {isFetching ? (
            <LuLoader2 className='animate-spin text-gray-500' size={15} />
          ) : (
            <p className='xl:text-3xl md:text-2xl text-xl font-[500] text-gray-450'>
              {weatherData?.current.condition.text}
            </p>
          )}
        </div>
        <div className='flex xl:justify-around pb-3 gap-2 md:gap-5 transition-all overflow-x-scroll overflow-y-hidden w-full snap-x rounded-xl'>
          {isFetching
            ? weekdays.map((el, idx) => (
                <WeatherSmContainer key={idx} weekday={el} />
              ))
            : weatherData?.forecast.forecastday.map(el => {
                const date = new Date(0);
                date.setUTCSeconds(el.date_epoch);
                const isToday = date.getDate() === curTime.getDate();
                let ref = undefined;
                if (isToday) {
                  ref = curDayRef;
                }
                return (
                  <WeatherSmContainer
                    dayRef={ref}
                    key={el.date_epoch}
                    temp={Math.round(el.day.avgtemp_c)}
                    weekday={date.toLocaleDateString('default', {
                      weekday: 'short',
                    })}
                    isToday={isToday}
                    iconUrl={el.day.condition.icon}
                  />
                );
              })}
        </div>
      </div>
      <div className='w-full h-1/4 min-h-36 flex flex-col md:h-full md:w-1/4 bg-[rgba(0,0,0,0.03)] transition-md p-4 pt-2'>
        <div className='w-full flex md:flex-col md:items-end justify-between gap-3 p-2 text-gray-700'>
          <p className='text-lg md:text-3xl'>{dayState}</p>
          <div className='flex gap-0.5 text-gray-500 text-xl md:text-3xl'>
            <p>{('0' + curTime.getHours()).slice(-2)}</p>
            <div className='animate-blink'>:</div>
            <p>{('0' + curTime.getMinutes()).slice(-2)}</p>
          </div>
        </div>
        <div className='relative flex md:flex-col flex-1 gap-2 md:gap-5 transition-all overflow-x-scroll overflow-y-hidden md:overflow-x-hidden md:overflow-y-scroll w-full xl:w-auto snap-x md:snap-y pb-4 md:pr-4 md:pt-4 rounded-xl'>
          {isFetching
            ? hours.map(el => <TimeWeatherContainer key={el} time={el} />)
            : weatherData?.forecast.forecastday[0].hour.map(el => {
                const date = new Date(0);
                date.setUTCSeconds(el.time_epoch);
                let ref = undefined;
                if (date.getHours() == curTime.getHours()) {
                  ref = curTimeRef;
                }
                return (
                  <TimeWeatherContainer
                    timeRef={ref}
                    isNowTime={ref?.current !== undefined}
                    key={el.time_epoch}
                    time={`${('0' + date.getHours()).slice(-2)}:${(
                      '0' + date.getMinutes()
                    ).slice(-2)}`}
                    temp={Math.round(el.temp_c)}
                    iconUrl={el.condition.icon}
                  />
                );
              })}
        </div>
      </div>
    </div>
  );
};

export default WeatherContainer;
