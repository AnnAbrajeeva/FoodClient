import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import HeroBg from 'assets/img/hero-bg.jpg';
import HeroText from 'assets/img/hero-text.svg';
import Container from 'components/Container';
import Loader from 'components/Loader';
import MultiDropdown, { Option } from 'components/MultiDropdown';
import NotFound from 'components/NotFound';
import Pagination from 'components/Pagination';
import { API_KEY } from 'config/api/api';
import RecipesStore from 'store/RecipesStore';
import { getPageCount } from 'utils/getPageCount';
import { Meta } from 'utils/meta';
import { useLocalStore } from 'utils/useLocalStore';
import RecipesWrapper from './components/RecipesWrapper';
import Search from './components/Search';
import styles from './HomePage.module.scss';

const ITEMS_PER_PAGE = 9;

const HomePage = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<Option[]>([]);
  const [page, setPage] = useState(1);

  const offset = (page - 1) * ITEMS_PER_PAGE + 1;

  const recipesStore = useLocalStore(() => new RecipesStore());

  useEffect(() => {
    recipesStore.getRecipesList({ offset: offset, itemsPerPage: ITEMS_PER_PAGE, apiKey: API_KEY, search });
  }, [offset, recipesStore]);

  const totalPages = getPageCount(recipesStore.totalRecipe, ITEMS_PER_PAGE);

  const changePage = (newPage: number) => {
    setPage(newPage);
  };

  const options: Option[] = [
    {
      key: 'MEAT',
      value: 'Meat',
    },
    {
      key: 'Apl',
      value: 'Apple',
    },
  ];

  const getTitle = (arr: Option[]) => {
    return Object.values(arr).join('');
  };

  return (
    <div className={styles.homepage}>
      <div className={styles.homepage__hero}>
        <img className={styles.homepage__img} src={HeroBg} alt="Food" />
        <img className={styles['homepage__hero-text']} src={HeroText} alt="Recipes" />
      </div>
      {recipesStore.meta === Meta.loading ? (
        <Loader size="l" />
      ) : (
        <Container>
          <Search value={search} onChange={setSearch} />
          <MultiDropdown
            className={styles.homepage__category}
            getTitle={getTitle}
            options={options}
            value={category}
            onChange={setCategory}
          />
          {recipesStore.list.length > 0 ? (
            <>
              <RecipesWrapper recipes={recipesStore.list} />
              <Pagination
                onChange={changePage}
                current={page}
                total={totalPages}
                perPage={ITEMS_PER_PAGE}
                disable={{ left: page === 1, right: page === totalPages }}
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
