import { useState } from 'react';
import Button from '../../ui/Button';
import MoviesHomeContainer from './MoviesHomeContainer';

export default function HomeContainer() {
  const [selected, setSelected] = useState('popular');

  return (
    <section>
      <div className='flex flex-row gap-5 justify-center items-center my-5 max-w-screen-lg mx-auto'>
        <Button
          handleClick={() => setSelected('popular')}
          selected={selected === 'popular'}
        >
          Popular
        </Button>
        <Button
          handleClick={() => setSelected('top_rated')}
          selected={selected === 'top_rated'}
        >
          Top Rated
        </Button>
      </div>
      {selected === 'popular' && <MoviesHomeContainer listType='popular' />}
      {selected === 'top_rated' && <MoviesHomeContainer listType='top_rated' />}
    </section>
  );
}
