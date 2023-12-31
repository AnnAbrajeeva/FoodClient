import rootStore from 'store/RootStore';
import { mealTypes } from 'utils/mealTypes';

export const getSelectedCategories = () => {
  const arr = rootStore.query.getParam('category');
  if (arr && typeof arr === 'string') {
    const newArr = arr.split(', ');
    return mealTypes.filter((item) => newArr.includes(item.value));
  }
  return [];
};
