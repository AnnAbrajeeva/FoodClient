import classNames from 'classnames';
import { FC, useCallback } from 'react';
import Arrow from 'assets/img/arrow.svg';
import Button from 'components/Button';
import { createPagination } from 'utils/createPagination';
import styles from './Pagination.module.scss';

type PaginationProps = {
  onChange: (num: number) => void;
  disable?: {
    left: boolean;
    right: boolean;
  };
  current: number;
  total: number;
  perPage: number;
};

const Pagination: FC<PaginationProps> = ({ onChange, disable, current, total }) => {
  const isActive = (num: number | string) => num === current;

  const getPrevPage = useCallback(() => {
    const prev = current - 1;
    onChange(prev > 0 ? prev : current);
  }, [current, onChange]);

  const getNextPage = useCallback(() => {
    const next = current + 1;
    onChange(next <= total ? next : current);
  }, [current, onChange, total]);

  

  return (
    <div className={styles.pagination}>
      <Button disabled={disable?.left} onClick={getPrevPage} className={styles.pagination__btn}>
        <img className={styles.pagination__next} src={Arrow} alt="Prev page" />
      </Button>
      {createPagination(total, current).map((num, i) => (
        <p
          onClick={typeof num === 'number' ? () => onChange(num) : () => {}}
          className={classNames(styles.pagination__num, isActive(num) && styles['pagination__num--active'])}
          key={i}
        >
          {num}
        </p>
      ))}
      <Button disabled={disable?.right} onClick={getNextPage} className={styles.pagination__btn}>
        <img src={Arrow} alt="Next page" />
      </Button>
    </div>
  );
};

export default Pagination;

