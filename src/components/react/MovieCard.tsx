import { Suspense, useEffect, useState } from 'react';
import type { Movie } from '../../types';

interface MovieCardProps {
  movie: Movie;
}

type MovieStorage = {
  id: number;
  original_title: string;
  poster_path: string;
};

export default function MovieCard({ movie }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);
  const [isOnWatchlist, setIsOnWatchlist] = useState<boolean>(false);
  const [watched, setWatched] = useState<boolean>(false);
  const [add, setAdd] = useState<number>(0);

  useEffect(() => {
    const watchlist = window.localStorage.getItem('watchlist');
    if (watchlist) {
      const isOn = JSON.parse(watchlist)?.some((m: Movie) => m.id === movie.id);
      if (isOn) {
        setIsOnWatchlist(true);
      } else setIsOnWatchlist(false);
    }
    const watchedList = window.localStorage.getItem('watched');
    if (watchedList) {
      const isOn = JSON.parse(watchedList)?.some(
        (m: Movie) => m.id === movie.id,
      );
      if (isOn) {
        setWatched(true);
      } else {
        setWatched(false);
      }
    }
  }, [add]);

  const addToWatchlist = () => {
    const movieToAdd = {
      id: movie.id,
      original_title: movie.original_title,
      poster_path: movie.poster_path,
    };
    const watchlist = window.localStorage.getItem('watchlist');
    if (watchlist) {
      const array = JSON.parse(watchlist);
      array.push(movieToAdd);
      const string = JSON.stringify(array);
      window.localStorage.setItem('watchlist', string);
      setAdd(add + 1);
    } else {
      const array = [];
      array.push(movieToAdd);
      const string = JSON.stringify(array);
      window.localStorage.setItem('watchlist', string);
      setAdd(add + 1);
    }
  };

  const removeFromWatchlist = () => {
    const watchlist = window.localStorage.getItem('watchlist');
    if (watchlist) {
      const array = JSON.parse(watchlist);
      const newArray = array.filter((m: MovieStorage) => m.id !== movie.id);
      const string = JSON.stringify(newArray);
      window.localStorage.setItem('watchlist', string);
      setAdd(add + 1);
    }
  };

  const addToWatched = () => {
    const movieToAdd = {
      id: movie.id,
      original_title: movie.original_title,
      poster_path: movie.poster_path,
    };
    const watched = window.localStorage.getItem('watched');
    if (watched) {
      const array = JSON.parse(watched);
      array.push(movieToAdd);
      const string = JSON.stringify(array);
      window.localStorage.setItem('watched', string);
      setAdd(add + 1);
    } else {
      const array = [];
      array.push(movieToAdd);
      const string = JSON.stringify(array);
      window.localStorage.setItem('watched', string);
      setAdd(add + 1);
    }
  };

  const removeFromWatched = () => {
    const watched = window.localStorage.getItem('watched');
    if (watched) {
      const array = JSON.parse(watched);
      const newArray = array.filter((m: MovieStorage) => m.id !== movie.id);
      const string = JSON.stringify(newArray);
      window.localStorage.setItem('watched', string);
      setAdd(add + 1);
    }
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`col-span-1 w-auto rounded-sm flex flex-col items-center gap-2 ${
        isImageLoaded ? '' : 'hidden'
      }`}
    >
      <div className='relative'>
        <div
          className={`w-fit gap-2 absolute bottom-1 right-0 left-0 mx-auto bg-black rounded-md px-2 py-2 flex flex-row justify-center items-center ${
            isHovered ? 'block' : 'hidden'
          }`}
        >
          {!watched ? (
            <button
              onClick={addToWatched}
              className='transition-all ease-in-out duration-300 cursor-pointer'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                className='size-6'
              >
                <path d='M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z' />
                <path
                  fill-rule='evenodd'
                  d='M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z'
                  clip-rule='evenodd'
                />
              </svg>
            </button>
          ) : (
            <button
              onClick={removeFromWatched}
              className=' text-red-600 transition-all ease-in-out duration-300 cursor-pointer'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                className='size-6'
              >
                <path d='M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z' />
                <path d='M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z' />
                <path d='M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z' />
              </svg>
            </button>
          )}
          {!isOnWatchlist ? (
            <button
              onClick={addToWatchlist}
              className='transition-all ease-in-out duration-300 cursor-pointer'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke-width='1.5'
                stroke='currentColor'
                className='size-6'
              >
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  d='M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z'
                />
              </svg>
            </button>
          ) : (
            <button
              onClick={removeFromWatchlist}
              className='text-red-600 transition-all ease-in-out duration-300 cursor-pointer'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke-width='1.5'
                stroke='currentColor'
                className='size-6'
              >
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  d='M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z'
                />
              </svg>
            </button>
          )}
        </div>

        <img
          className={`w-auto h-80 rounded border-2 border-transparent ${
            watched ? 'hover:border-green-600' : 'hover:border-slate-100'
          } transition-all ease-in-out duration-300 cursor-pointer`}
          src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
          onLoad={() => setIsImageLoaded(true)}
        />
      </div>
      <a
        href={`/movie?id=${movie.id}`}
        className='text-sm leading-8 truncate max-w-40 hover:opacity-70 transition-all ease-in-out duration-300 cursor-pointer'
      >
        {movie.title}
      </a>
    </div>
  );
}
