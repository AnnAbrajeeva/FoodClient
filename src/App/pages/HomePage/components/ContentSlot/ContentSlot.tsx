import { FC } from 'react';
import Text from 'components/Text';
import { Calory } from 'utils/entityTypes';

type ContentSlotProps = {
  options: Calory[];
};

const ContentSlot: FC<ContentSlotProps> = ({ options }) => {
  const caloryAmount = options.find((option) => option.name === 'Calories')?.amount || 0;

  return <Text tag="span" weight="bold" color="accent">{`${caloryAmount} kcal`}</Text>;
};

export default ContentSlot;
