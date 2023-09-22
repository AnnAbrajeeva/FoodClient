import { FC, memo } from 'react';
import Time from 'assets/img/time.svg';
import Text from 'components/Text';
import styles from './CaptionSlot.module.scss';

type CaptionSlotProps = {
  timeToPrepare: number | null;
};

const CaptionSlot: FC<CaptionSlotProps> = ({ timeToPrepare }) => {
  const value = timeToPrepare && timeToPrepare > 0 ? `${timeToPrepare} minutes` : '—';

  return (
    <span className={styles.caption}>
      <img src={Time} alt="time to prepare" />
      <Text tag="span" color="secondary" view="p-14">
        {value}
      </Text>
    </span>
  );
};

export default memo(CaptionSlot);
