import type { MouseEventHandler } from 'react';

interface ButtonProps {
  children: React.ReactNode;
  selected: boolean;
  handleClick: MouseEventHandler;
}

export default function Button({
  children,
  selected,
  handleClick,
}: ButtonProps) {
  return (
    <button
      onClick={handleClick}
      className={`border border-slate-100 px-5 py-2 rounded hover:opacity-70 ${
        !selected && 'border-slate-600'
      } transition-all ease-in-out duration-300`}
    >
      {children}
    </button>
  );
}
