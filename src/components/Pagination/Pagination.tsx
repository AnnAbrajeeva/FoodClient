import classNames from 'classnames';
import { FC } from 'react';
import Arrow from 'assets/img/arrow.svg';
import Button from 'components/Button';
import styles from './Pagination.module.scss';

type PaginationProps = {
  getNextPage: () => void;
  getPrevPage: () => void;
  onChange: (num: number) => void;
  disable?: {
    left: boolean;
    right: boolean;
  };
  current: number;
  total: number;
  perPage: number;
};

const Pagination: FC<PaginationProps> = ({ getNextPage, getPrevPage, onChange, disable, current, total }) => {


  const isActive = (num: number | string) => {
    let className = '';
    if (num === current) {
      className = styles['pagination__num--active'];
    }
    return className;
  };

  const pageArr = (): (number | string)[] => {
    const arr = [];
    if (total < 7) {
      for (let i = 1; i <= total; i++) {
        arr.push(i);
      }
      return arr;
    }

    for (let i = 1; i <= 3; i++) {
      arr.push(i);
    }

    arr.push('...');

    for (let i = total - 2; i <= total; i++) {
      arr.push(i);
    }

    return arr;
  };
  return (
    <div className={styles.pagination}>
      <Button disabled={disable?.left} onClick={getPrevPage} className={styles.pagination__btn}>
        <img className={styles.pagination__next} src={Arrow} alt="Prev page" />
      </Button>
      {pageArr().map((num) => (
        <p
          onClick={typeof num === 'number' ? () => onChange(num) : () => {}}
          className={classNames(styles.pagination__num, isActive(num))}
          key={num}
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
