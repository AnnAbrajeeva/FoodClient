import Input from 'components/Input';
import { FC, useCallback, useEffect, useState } from 'react';
import { RecipeModel } from 'entites/Recipe';
import SearchRecipesStore from 'store/SearchRecipesStore';
import debounce from 'lodash.debounce';
import SearchCard from '../SearchCard';
import { observer } from 'mobx-react-lite';
import s from './MealSearch.module.scss';

type MealSearchProps = {
  dragOverHandler: (e: any) => void;
  dragLeaveHandler: (e: any) => void;
  dragStartHandler: (e: any, product: RecipeModel) => void;
  dragEndHandler: (e: any) => void;
  store: SearchRecipesStore;
};
const MealSearch: FC<MealSearchProps> = ({
  dragOverHandler,
  dragLeaveHandler,
  dragStartHandler,
  dragEndHandler,
  store,
}) => {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState<RecipeModel[]>(store.searchList || []);

  const changeSearch = (value: string) => {
    setSearch(value);
  };

  const searching = useCallback(
    debounce(() => {
      fetchRecipes();
    }, 1200),
    [search, store], 
  );

  const fetchRecipes = async () => {
    try {
      await store.fetchSearchList(search);
      setProducts(store.searchList || []);
    } catch (error) {
      console.error('Ошибка при загрузке рецептов', error);
    }
  };

  useEffect(() => {
    searching();
  }, [search, searching]);


  return (
    <div className={s.search}>
      <div className={s.search__wrap}>
        <Input placeholder='Enter you meal' value={search} onChange={(e) => changeSearch(e.target.value)} type="search" />
      </div>
      <div className={s['search__cards-wrapper']}>
        {products.length > 0 &&
          products.map((item) => (
            <SearchCard
              product={item}
              dragOverHandler={dragOverHandler}
              dragLeaveHandler={dragLeaveHandler}
              dragStartHandler={dragStartHandler}
              dragEndHandler={dragEndHandler}
              key={item.id}
            />
          ))}
      </div>
    </div>
  );
};

export default observer(MealSearch);
