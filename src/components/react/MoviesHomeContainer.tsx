import { useEffect, useState } from 'react';
import type { MoviesResult, Movie } from '../../types';
import MovieCard from './MovieCard';

interface MoviesHomeContainerProps {
  listType: string;
}

export default function MoviesHomeContainer({
  listType = 'popular',
}: MoviesHomeContainerProps) {
  const [moviesData, setMoviesData] = useState<MoviesResult | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${listType}?language=en-US&page=1`,
          {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${
                import.meta.env.ASTRO_TMDB_ACCESS_TOKEN
              }`,
            },
          },
        );
        const res = await response.json();
        console.log(res);
        setMoviesData(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovies();
  }, []);

  return (
    <section>
      <div className='grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 items-stretch gap-2'>
        {moviesData?.results?.map((movie: Movie) => {
          return <MovieCard movie={movie} />;
        })}
      </div>
    </section>
  );
}
