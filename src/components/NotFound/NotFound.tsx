import { memo } from 'react';
import Text from 'components/Text';
import s from './NotFound.module.scss';

const NotFound = () => {
  return (
    <div className={s.empty}>
      <Text color="accent" view="title" weight="bold">
        Recipes not found
      </Text>
    </div>
  );
};

export default memo(NotFound);
