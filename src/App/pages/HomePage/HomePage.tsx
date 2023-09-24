import debounce from 'lodash.debounce';
import { observer } from 'mobx-react-lite';
import { stringify } from 'qs';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import HeroBg from 'assets/img/hero-bg.jpg';
import HeroText from 'assets/img/hero-text.svg';
import Container from 'components/Container';
import Loader from 'components/Loader';
import MultiDropdown, { Option } from 'components/MultiDropdown';
import NotFound from 'components/NotFound';
import Pagination from 'components/Pagination';
import { mealTypes } from 'config/mealTypes';
import { useLocalStore } from 'hooks/useLocalStore';
import AutocompleteStore from 'store/AutocompleteStore';
import RecipesStore from 'store/RecipesStore';
import rootStore from 'store/RootStore';
import { getSelectedCategories } from 'utils/getSelectedCategories';
import { Meta } from 'utils/meta';
import RecipesWrapper from '../../../components/RecipesWrapper';
import Search from './components/Search';
import styles from './HomePage.module.scss';

const ITEMS_PER_PAGE = 9;

const HomePage = () => {
  const [search, setSearch] = useState((rootStore.query.getParam('search') as string) || '');
  const [category, setCategory] = useState<Option[]>(getSelectedCategories() || []);
  const [page, setPage] = useState(Number(rootStore.query.getParam('page')) || 1);
  const [, setSearchParams] = useSearchParams();

  const offset = (page - 1) * ITEMS_PER_PAGE + 1;

  const recipesStore = useLocalStore(() => new RecipesStore());
  const autocompleteStore = useLocalStore(() => new AutocompleteStore());

  useLayoutEffect(() => {
    const updateSearchParams = async () => {
      const queryString = stringify({
        offset,
        page,
        ...(category.length > 0 ? { category: getTitle(category) } : {}),
        ...(search ? { search } : {}),
      });

      setSearchParams(queryString);
    };

    updateSearchParams();
  }, [offset, search, page, category]);

  useEffect(() => {
    const fetchRecipes = () => {
      recipesStore.getRecipesList({ offset: offset, itemsPerPage: ITEMS_PER_PAGE, search, category });
    };

    const debouncedFetchRecipes = debounce(fetchRecipes, 1200);

    debouncedFetchRecipes();
  }, [offset, recipesStore, category]);

  const getRecipes = () => {
    recipesStore.getRecipesList({ offset: offset, itemsPerPage: ITEMS_PER_PAGE, search, category });
  };

  const handleChangeSearch = (value: string) => {
    autocompleteStore.fetchAutocomplete({ value });
    setSearch(value);
  };

  const changePage = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const setNewCategory = useCallback((category: Option[]) => {
    setCategory(category);
    setPage(1);
  }, []);

  const setSearchValue = useCallback((e: React.MouseEvent<HTMLLIElement>) => {
    const target = e.target as HTMLLIElement;
    setSearch(target.textContent || '');
    setPage(1);
    getRecipes();
  }, [search]);

  const getTitle = (arr: Option[]) => {
    return arr.map((category) => category.value).join(', ');
  };

  return (
    <div className={styles.homepage}>
      <div className={styles.homepage__hero}>
        <img className={styles.homepage__img} src={HeroBg} alt="Food" />
        <img className={styles['homepage__hero-text']} src={HeroText} alt="Recipes" />
      </div>
      {recipesStore.meta === Meta.loading && <Loader size="l" />}
      {recipesStore.meta === Meta.success && (
        <Container>
          <Search setSearchValue={setSearchValue} completeList={autocompleteStore.list} value={search} getRecipes={getRecipes} onChange={handleChangeSearch} />
          <MultiDropdown
            className={styles.homepage__category}
            getTitle={getTitle}
            options={mealTypes}
            value={category}
            onChange={setNewCategory}
          />
          {recipesStore.list.length > 0 ? (
            <>
              <RecipesWrapper recipes={recipesStore.list} />
              <Pagination
                onChange={changePage}
                current={page}
                total={recipesStore.pageCount}
                perPage={ITEMS_PER_PAGE}
                disable={{ left: page === 1, right: page === recipesStore.pageCount }}
              />
            </>
          ) : (
            <NotFound />
          )}
        </Container>
      )}
    </div>
  );
};

export default observer(HomePage);
