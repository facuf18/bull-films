import { useEffect, useState } from 'react';
import type { MovieStorage } from '../../types';
import MovieCard from './MovieCard';

export default function WatchedContainer() {
  const [movies, setMovies] = useState<MovieStorage[] | null>(null);

  useEffect(() => {
    const watched = window.localStorage.getItem('watched');
    if (watched) {
      const array = JSON.parse(watched);
      setMovies(array);
    }
  }, []);

  return (
    <section>
      <div className='flex flex-col gap-4 items-center justify-center my-5'>
        <h4 className='text-5xl'>Watched Movies</h4>
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
              <p>No movies found </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
