import { FC } from 'react';
import Text from 'components/Text';
import { CaloryModel } from 'store/RecipesStore/models/recipe';

type ContentSlotProps = {
  options: CaloryModel[];
};

const ContentSlot: FC<ContentSlotProps> = ({ options }) => {
  const caloryAmount = options.find((option) => option.name === 'Calories')?.amount || 0;

  return <Text tag="span" weight="bold" color="accent">{`${caloryAmount} kcal`}</Text>;
};

export default ContentSlot;
