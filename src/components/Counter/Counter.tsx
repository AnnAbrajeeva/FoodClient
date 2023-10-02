import Button from 'components/Button';
import Text from 'components/Text';
import { FC } from 'react';
import s from './Counter.module.scss';

type CounterProps = {
  value: number;
  incr: () => void;
  decr: () => void;
};

const Counter: FC<CounterProps> = ({ value, incr, decr }) => {
  return (
    <div className={s.counter}>
      <Button onClick={decr}>-</Button>
      <Text>{value}</Text>
      <Button onClick={incr}>+</Button>
    </div>
  );
};

export default Counter;
