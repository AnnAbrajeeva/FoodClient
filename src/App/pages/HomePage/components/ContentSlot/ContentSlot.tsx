import { FC } from "react";
import Text from "components/Text";
import { Calory } from "../../types";

type ContentSlotProps = {
    options: Calory[];
}

const ContentSlot: FC<ContentSlotProps> = ({options}) => {
  const calory = (options: Calory[]) => {
    let caloryAmount = 0;
    options.forEach((val) => {
      if (val.name === 'Calories') {
        caloryAmount = val.amount;
      }
    });
    return caloryAmount;
  };
  return <Text weight="bold" color="accent">{`${calory(options)} kcal`}</Text>;
};

export default ContentSlot;
