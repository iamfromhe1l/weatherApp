import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { FiSearch, FiSun } from 'react-icons/fi';

const SearchForm = () => {
  const [location, setLocation] = useState<string>('');
  const searchParams = useSearchParams();
  const router = useRouter();
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    input.current?.focus();
  }, []);

  const isLocationError = searchParams.get('error') ? true : false;

  const searchLocation = (e: FormEvent) => {
    e.preventDefault();
    router.push(`/weather?location=${location}`);
  };
  return (
    <div className='bg-gray-200 p-4 rounded-xl w-3/4 md:w-[600px] h-60 flex flex-col'>
      <div className='flex justify-between text-gray-700'>
        <div className='flex gap-1 justify-center items-center'>
          <FiSun size={16} />
          <p>WeatherApp</p>
        </div>
        <p>
          {new Date().toLocaleDateString('default', {
            day: 'numeric',
            month: 'long',
          })}
        </p>
      </div>
      <h1 className='text-center mt-12 text-xl sm:text-2xl'>Введите локацию</h1>
      <div className='flex flex-col justify-center items-center flex-1'>
        <form
          className='flex gap-1 w-3/4 justify-center items-center'
          onSubmit={e => searchLocation(e)}
        >
          <input
            ref={input}
            type='text'
            placeholder='Москва'
            onChange={el => setLocation(el.target.value)}
            content={location}
            required
            className='focus w-3/4 px-5 py-2 h-14 rounded-xl bg-gray-200 border border-gray-400 text-gray-700 focus'
          />
          <button
            type='submit'
            className='border-0 bg-gray-700 rounded-xl p-4 hover:bg-gray-500 transition-all'
          >
            <FiSearch size={25} className='text-gray-200' />
          </button>
        </form>
        <p className='text-red-500/80 mt-1 text-sm'>
          {isLocationError ? 'Ошибка поиска локации! Введите ещё раз' : ''}
        </p>
      </div>
    </div>
  );
};

export default SearchForm;
