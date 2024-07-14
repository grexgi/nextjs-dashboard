// Test and Train coding with react
'use client';
import { useState } from 'react';

export default function Page() {
  const [count, setCount] = useState(0);
  function handler() {
    setCount(count + 1);
  }

  return (
    <div className="flex flex-col gap-3">
      <CounterButton count={count} onClick={handler} />
      <CounterButton count={count} onClick={handler} />

      <div className="text-xs font-bold text-red-500 md:text-lg">*Belum*</div>
    </div>
  );
}

function CounterButton({
  count,
  onClick,
}: {
  count: number;
  onClick: () => void;
}) {
  return (
    <button
      className="rounded-md border-black bg-slate-500 p-3 hover:opacity-90"
      onClick={onClick}
    >
      count {count}
    </button>
  );
}
