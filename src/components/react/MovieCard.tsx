import type { Movie } from '../../types';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className='col-span-1 rounded-sm flex flex-col items-center gap-2 hover:opacity-60 transition-all ease-in-out duration-300 cursor-pointer'>
      <img
        className='w-auto h-80'
        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
      />
      <p className='text-sm leading-8 truncate'>{movie.title}</p>
    </div>
  );
}
