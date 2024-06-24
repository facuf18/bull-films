import { Suspense } from 'react';
import type { Movie } from '../../types';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <a
      href={`/movie?id=${movie.id}`}
      className='col-span-1 w-auto rounded-sm flex flex-col items-center gap-2 hover:opacity-60 transition-all ease-in-out duration-300 cursor-pointer'
    >
      <Suspense fallback={''}>
        <img
          className='w-auto h-80'
          src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
        />
      </Suspense>
      <p className='text-sm leading-8 truncate max-w-40'>{movie.title}</p>
    </a>
  );
}
