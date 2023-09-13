import { useEffect, useState } from 'react';
import HeroBg from 'assets/img/hero-bg.jpg';
import HeroText from 'assets/img/hero-text.svg';
import Container from 'components/Container';
import Loader from 'components/Loader';
import MultiDropdown, { Option } from 'components/MultiDropdown';
import Pagination from 'components/Pagination';
import { api, API_KEY } from 'config/api/api';
import { Recipe } from 'utils/entityTypes';
import { getPageCount } from 'utils/getPageCount';
import RecipesWrapper from './components/RecipesWrapper';
import Search from './components/Search';
import styles from './HomePage.module.scss';

const ITEMS_PER_PAGE = 9;

const HomePage = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<Option[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const offset = (page - 1) * ITEMS_PER_PAGE + 1;

  useEffect(() => {
    async function getAllRecipes() {
      try {
        setIsLoading(true);

        const res = await api.get(
          `recipes/complexSearch?apiKey=${API_KEY}&addRecipeNutrition=true&offset=${offset}&number=${ITEMS_PER_PAGE}&limitLicense=true`,
        );

        const totalPages = getPageCount(res.data.totalResults, ITEMS_PER_PAGE);

        setTotal(totalPages);
        setRecipes(res.data.results);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);

        if (error instanceof Error) {
          throw new Error(error.message);
        }
      }
    }
    getAllRecipes();
  }, [page, offset]);

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
      {isLoading ? (
        <Loader size='l' />
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
          {recipes && <RecipesWrapper recipes={recipes} />}
          <Pagination
            onChange={changePage}
            current={page}
            total={total}
            perPage={ITEMS_PER_PAGE}
            disable={{ left: page === 1, right: page === total }}
          />
        </Container>
      )}
    </div>
  );
};

export default HomePage;
