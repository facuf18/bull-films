import { useEffect, useState } from 'react';
import type { MovieStorage } from '../../types';
import MovieCard from './MovieCard';

export default function WatchlistContainer() {
  const [movies, setMovies] = useState<MovieStorage[] | null>(null);
  const [showNoMovies, setShowNoMovies] = useState<boolean>(false);

  useEffect(() => {
    const watchlist = window.localStorage.getItem('watchlist');
    if (watchlist) {
      const array = JSON.parse(watchlist);
      if (array.length > 0) {
        setMovies(array);
      } else {
        setShowNoMovies(true);
      }
    } else {
      setShowNoMovies(true);
    }
  }, []);

  return (
    <section>
      <div className='flex flex-col gap-4 items-center justify-center my-5'>
        <h4 className='text-5xl'>Watchlist</h4>
        <div className='flex flex-wrap gap-2 items-stretch justify-center m-0'>
          {movies && movies.length > 0 ? (
            movies?.map((movie) => {
              return (
                <div key={movie.id}>
                  <MovieCard movie={movie} />
                </div>
              );
            })
          ) : (
            <div className='my-44'>
              {showNoMovies && <p>No movies found </p>}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
