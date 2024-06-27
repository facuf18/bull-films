import { Suspense, useEffect, useState } from 'react';
import type { Movie, MovieStorage } from '../../types';
import SkelletonCard from './SkelletonCard';

interface MovieCardProps {
  movie: Movie | MovieStorage;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);
  const [isOnWatchlist, setIsOnWatchlist] = useState<boolean>(false);
  const [watched, setWatched] = useState<boolean>(false);
  const [add, setAdd] = useState<number>(0);
  const [borderColor, setBorderColor] = useState('slate-100');

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
      title: movie.title,
      poster_path: movie.poster_path,
      vote_average: movie.vote_average,
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
    if (watched) removeFromWatched();
    setBorderColor('orange-400');
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
    setBorderColor('slate-100');
  };

  const addToWatched = () => {
    const movieToAdd = {
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      vote_average: movie.vote_average,
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
    if (isOnWatchlist) removeFromWatchlist();
    setBorderColor('green-600');
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
    setBorderColor('slate-100');
  };

  return (
    <>
      {isImageLoaded ? (
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`col-span-1 w-auto rounded-sm flex flex-col items-center ${
            isImageLoaded ? '' : 'hidden'
          }`}
        >
          <div className='relative'>
            <div
              className={`w-fit gap-2 absolute bottom-1 right-0 left-0 mx-auto bg-black opacity-70 rounded-md px-2 py-2 flex flex-row justify-center items-center ${
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
                      fillRule='evenodd'
                      d='M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z'
                      clipRule='evenodd'
                    />
                  </svg>
                </button>
              ) : (
                <button
                  onClick={removeFromWatched}
                  className=' text-green-400 transition-all ease-in-out duration-300 cursor-pointer'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    className='size-6'
                  >
                    <path d='M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z' />
                    <path
                      fillRule='evenodd'
                      d='M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z'
                      clipRule='evenodd'
                    />
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
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='size-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z'
                    />
                  </svg>
                </button>
              ) : (
                <button
                  onClick={removeFromWatchlist}
                  className='text-orange-400 transition-all ease-in-out duration-300 cursor-pointer'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='size-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z'
                    />
                  </svg>
                </button>
              )}
            </div>
            <div>
              <div
                className={`absolute top-2 right-2 bg-black bg-opacity-70 rounded-md px-2 flex flex-row gap-1 items-center align-middle`}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  className='size-4 text-yellow-400'
                >
                  <path
                    fillRule='evenodd'
                    d='M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z'
                    clipRule='evenodd'
                  ></path>
                </svg>
                <p className='font-medium'>{movie.vote_average.toFixed(1)}</p>
              </div>
            </div>
            <a href={`/movie?id=${movie.id}`}>
              <img
                className={`w-auto h-80 rounded border-2 border-transparent ${`hover:border-${borderColor}`} ${
                  isOnWatchlist && 'hover:bg-orange-400'
                } transition-all ease-in-out duration-300 cursor-pointer`}
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                onLoad={() => setIsImageLoaded(true)}
              />
            </a>
          </div>
          <a
            href={`/movie?id=${movie.id}`}
            className='text-sm leading-8 truncate max-w-40 hover:opacity-70 transition-all ease-in-out duration-300 cursor-pointer'
          >
            {movie.title}
          </a>
        </div>
      ) : (
        <>
          <img
            className='hidden'
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            onLoad={() => setIsImageLoaded(true)}
          />
          <SkelletonCard />
        </>
      )}
    </>
  );
}
