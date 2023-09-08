import { useEffect, useState } from 'react';
import HeroBg from 'assets/img/hero-bg.jpg';
import HeroText from 'assets/img/hero-text.svg';
import MultiDropdown, { Option } from 'components/MultiDropdown';
import Pagination from 'components/Pagination';
import { api, API_KEY } from '../../../api/api';
import RecipesWrapper from './components/RecipesWrapper/RecipesWrapper';
import Search from './components/Search/Search';
import { Recipe } from './types';
import styles from './HomePage.module.scss';

const HomePage = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<Option[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const itemsPerPage = 9;

  const getOffset = () => {
    return (page - 1) * itemsPerPage + 1;
  };

  useEffect(() => {
    async function getAllRecipes() {
      try {
        const res = await api.get(
          `recipes/complexSearch?apiKey=${API_KEY}&addRecipeNutrition=true&offset=${getOffset()}&number=${itemsPerPage}&limitLicense=true`,
        );
        const totalPages = getPageCount(res.data.totalResults);
        setTotal(totalPages);
        setRecipes(res.data.results);
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
      }
    }
    getAllRecipes();
  }, [page]);

  const changePage = (newPage: number) => {
    setPage(newPage);
  };

  const getPageCount = (total: number) => {
    return Math.ceil(total / itemsPerPage);
  };

  const getPrevPage = () => {
    const prev = page - 1;
    setPage(prev > 0 ? prev : page);
  };

  const getNextPage = () => {
    const next = page + 1;
    setPage(next <= total ? next : page);
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
        <img src={HeroBg} alt="Food" />
        <img className={styles['homepage__hero-text']} src={HeroText} alt="Recipes" />
      </div>
      <div className="container">
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
          getNextPage={getNextPage}
          getPrevPage={getPrevPage}
          onChange={changePage}
          current={page}
          total={total}
          perPage={itemsPerPage}
          disable={{ left: page === 1, right: page === total }}
        />
      </div>
    </div>
  );
};

export default HomePage;
