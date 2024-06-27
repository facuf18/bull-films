import React, { Suspense, useState } from 'react';
import Button from '../../ui/Button';
import MoviesHomeContainer from './MoviesHomeContainer';
import Loading from './Loading';

export default function HomeContainer() {
  const [selected, setSelected] = useState('popular');
  const [search, setSearch] = useState('');
  const [refreshSearch, setRefreshSearch] = useState<number>(0);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (search.length > 0) {
      setSelected('search');
      setRefreshSearch(refreshSearch + 1);
    }
  };

  return (
    <section>
      <div className='flex flex-col md:flex-row gap-2 items-center justify-center my-5'>
        <div className='flex flex-row gap-5 justify-center items-center '>
          <Button
            handleClick={() => {
              setSelected('popular');
              setSearch('');
            }}
            selected={selected === 'popular'}
          >
            Popular
          </Button>
          <Button
            handleClick={() => {
              setSelected('top_rated');
              setSearch('');
            }}
            selected={selected === 'top_rated'}
          >
            Top Rated
          </Button>
        </div>
        <form
          className='inline-flex gap-1 border border-slate-600 rounded px-2 py-1.5'
          role='group'
        >
          <input
            className='bg-transparent text-slate-100 focus:outline-none'
            name='search'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Movie name'
            autoComplete='off'
          />
          <button onClick={handleSubmit}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='size-7 text-slate-100 hover:opacity-70 transition-all ease-in-out duration-300'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
              />
            </svg>
          </button>
        </form>
      </div>

      {selected === 'popular' && <MoviesHomeContainer listType='popular' />}
      {selected === 'top_rated' && <MoviesHomeContainer listType='top_rated' />}
      {selected === 'search' && (
        <MoviesHomeContainer
          listType='search'
          searchQuery={search}
          refreshSearch={refreshSearch}
        />
      )}
    </section>
  );
}
