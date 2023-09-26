import { useState } from 'react';

const usePagination = (initialOffset: number, initialLimit: number) => {
  const [offset, setOffset] = useState(initialOffset);
  const [limit, setLimit] = useState(initialLimit);

  const setPagination = (newOffset: number, newLimit: number) => {
    setOffset(newOffset);
    setLimit(newLimit);
  };

  return { offset, limit, setPagination };
};

export default usePagination;
