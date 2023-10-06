import Container from 'components/Container';
import Text from 'components/Text';
import s from './MealPlan.module.scss';
import Table from './Table';
import { createContext, useEffect, useState } from 'react';
import { BoardType, Cell } from './Table/Table';
import { food } from './food';
import { MealPlaneDayModel } from 'entites/MealPlaneDay';
import UserMealPlanStore from 'store/UserMealPlanStore';
import { useLocalStore } from 'hooks/useLocalStore';
import { days } from 'store/UserMealPlanStore/types';
import { RecipeModel } from 'entites/Recipe';
import { IngredientModel } from 'entites/Ingredient';
import SearchRecipesStore from 'store/SearchRecipesStore';
import MealSearch from './MealSearch';
import { observer } from 'mobx-react-lite';
import LocalStorageStore from 'store/RootStore/LocalStorageStore';
import rootStore from 'store/RootStore/instance';
import { tableData } from 'utils/tableData';

export type MealDay = {
  id: number;
  title: string;
  day: Item[];
};

export type Item = {
  slot: number;
  items: RecipeModel[];
};

interface MealPlanContextType {
  currentBoard: MealDay | null;
  setCurrentBoard: (value: MealDay) => void;
  currentItem: RecipeModel | null;
  setCurrentItem: (value: RecipeModel) => void;
  boards: MealDay[];
  setBoards: (value: MealDay[]) => void;
}
export const MealPlanContext = createContext<MealPlanContextType>({} as MealPlanContextType);

const MealPlan = () => {
  const userMealPlanStore = useLocalStore(() => new UserMealPlanStore());
  const searchStore = useLocalStore(() => new SearchRecipesStore());
  
  let userBoards: MealDay[]
  const user = rootStore.localStorage.getLocalItem('user');
  if (user) {
    userBoards = user[0].boards
  }

  const [boards, setBoards] = useState<MealDay[]>(user && user[0].boards || tableData);

  const [currentBoard, setCurrentBoard] = useState<MealDay | null>(null);
  const [currentItem, setCurrentItem] = useState<RecipeModel | null>(null);

  function dragOverHandler(e: any): void {
    e.preventDefault();
    if (e.target.className === s.item) {
      e.target.style.boxShadow = '0 4px 3px gray';
    }
  }

  function dragLeaveHandler(e: any): void {
    e.target.style.boxShadow = 'none';
  }

  function dragStartHandler(e: any, product: any): void {
    setCurrentItem(product);
  }

  function dragEndHandler(e: any): void {
    e.target.style.boxShadow = 'none';
  }

  function dropHandler(e: any, board: MealDay, slot: number): void {
    e.preventDefault();

    const findBoardIndex = boards.findIndex((item) => item.id === board.id);

    if (currentItem) {
      const currentIndex = currentBoard ? boards.findIndex((item) => item.id === currentBoard.id) : -1;

      if (currentIndex === -1) {
        const targetSlotIndex = board.day.findIndex((slotItem) => slotItem.slot === slot);
        console.log(targetSlotIndex);
        if (targetSlotIndex !== -1) {
          board.day[targetSlotIndex].items.push(currentItem);
        }
      } else {
        const currentSlotIndex = currentBoard!.day.findIndex((slotItem) => slotItem.items.includes(currentItem));
        if (currentSlotIndex !== -1) {
          currentBoard!.day[currentSlotIndex].items.splice(
            currentBoard!.day[currentSlotIndex].items.indexOf(currentItem),
            1,
          );
        }

        const targetSlotIndex = board.day.findIndex((slotItem) => slotItem.slot === slot);
        if (targetSlotIndex !== -1) {
          board.day[targetSlotIndex].items.push(currentItem);
        }
      }

      setBoards((prevBoards) => {
        const updatedBoards: MealDay[] = [...prevBoards];
        updatedBoards[currentIndex] = currentBoard!;
        updatedBoards[findBoardIndex] = board;
        console.log(updatedBoards);
        return updatedBoards;
      });

      setCurrentBoard(null);
      setCurrentItem(null);

      let user = rootStore.localStorage.getLocalItem('user')[0];
      user = { ...user, boards: boards };

      rootStore.localStorage.removeItem('user');
      rootStore.localStorage.setLocalItem('user', user);
      // userMealPlanStore.addToMealPlan(boards)
    }
  }

  return (
    <MealPlanContext.Provider value={{ currentBoard, setCurrentBoard, currentItem, setCurrentItem, boards, setBoards }}>
      <div className={s.plan}>
        <Container>
          <Text tag="h1" view="title" weight="bold" className={s.plan__title}>
            Meal Planner with Recipes and Products
          </Text>
          {!rootStore.userStore.user && (
            <div className={s.plan__attention}>
              <Text>You must login to use the shopping list.</Text>
            </div>
          )}
          {rootStore.userStore.user && (
            <div className={s.plan__wrapper}>
              <MealSearch
                dragOverHandler={dragOverHandler}
                dragLeaveHandler={dragLeaveHandler}
                dragStartHandler={dragStartHandler}
                dragEndHandler={dragEndHandler}
                store={searchStore}
              />
              <Table onDrop={(e, board, index) => dropHandler(e, board, index)} />
            </div>
          )}
        </Container>
      </div>
    </MealPlanContext.Provider>
  );
};

export default observer(MealPlan);
