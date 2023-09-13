import classNames from 'classnames';
import { FC } from 'react';
import Button from 'components/Button';
import styles from './Burger.module.scss';

type BurgerProps = {
  onChange: () => void;
  isOpen: boolean;
};

const Burger: FC<BurgerProps> = ({ onChange, isOpen }) => {
  const classes = classNames(styles.burger, isOpen && styles['burger--active']);
  return (
    <Button onClick={onChange} className={classes}>
      <span className={styles.burger__line}></span>
    </Button>
  );
};

export default Burger;
