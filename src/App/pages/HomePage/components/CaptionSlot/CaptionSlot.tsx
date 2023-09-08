import { FC } from 'react';
import Time from 'assets/img/time.svg';
import Text from 'components/Text';
import styles from './CaptionSlot.module.scss';

type CaptionSlotProps = {
  text: number;
};

const CaptionSlot: FC<CaptionSlotProps> = ({ text }) => {
  const value = text && text > 0 ? `${text} minutes` : '';
  return (
    <span className={styles.caption}>
      <img  src={Time} alt="time to prepare" />
      <Text tag="span" view="p-14">
        {value}
      </Text>
    </span>
  );
};

export default CaptionSlot;
