import { useEffect, useState } from 'react';
import type { MoviesResult, Movie } from '../../types';
import MovieCard from './MovieCard';
import Loading from './Loading';

interface MoviesHomeContainerProps {
  listType: string;
  searchQuery?: string;
  refreshSearch?: number;
}

export default function MoviesHomeContainer({
  listType = 'popular',
  searchQuery,
  refreshSearch,
}: MoviesHomeContainerProps) {
  const [moviesData, setMoviesData] = useState<MoviesResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showNoMovies, setShowNoMovies] = useState<boolean>(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        if (listType === 'popular' || listType === 'top_rated') {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${listType}?language=en-US&page=1`,
            {
              method: 'GET',
              headers: {
                accept: 'application/json',
                Authorization: `Bearer ${
                  import.meta.env.PUBLIC_TMDB_ACCESS_TOKEN
                }`,
              },
            },
          );
          const res = await response.json();
          if (res?.results?.length < 1) setShowNoMovies(true);
          setMoviesData(res);
          setIsLoading(false);
        } else if (listType === 'search') {
          const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=1`,
            {
              method: 'GET',
              headers: {
                accept: 'application/json',
                Authorization: `Bearer ${
                  import.meta.env.PUBLIC_TMDB_ACCESS_TOKEN
                }`,
              },
            },
          );
          const res = await response.json();
          if (res?.results?.length < 1) setShowNoMovies(true);
          setMoviesData(res);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovies();
  }, [refreshSearch]);

  return (
    <section className='mx-auto'>
      <div className='flex flex-wrap gap-2 items-stretch justify-center m-0'>
        {isLoading ? (
          <div className='my-44'>
            <Loading />
          </div>
        ) : (
          <>
            {moviesData && moviesData?.results?.length > 0 ? (
              <>
                {moviesData?.results?.map((movie: Movie) => {
                  return (
                    <div key={movie.id}>
                      <MovieCard movie={movie} />
                    </div>
                  );
                })}
              </>
            ) : (
              <div className='my-44'>
                {showNoMovies && <p>No movies found </p>}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
