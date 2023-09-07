import { useEffect, useState } from 'react';
import HeroBg from 'assets/img/hero-bg.jpg';
import HeroText from 'assets/img/hero-text.svg';
import MultiDropdown, { Option } from 'components/MultiDropdown';
import { api, API_KEY } from '../../../api/api';
import RecipesWrapper from './components/RecipesWrapper/RecipesWrapper';
import Search from './components/Search/Search';
import { Recipe } from './types';
import styles from './HomePage.module.scss';

const HomePage = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<Option[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    async function getAllRecipes() {
      try {
        const res = await api.get(`recipes/complexSearch?apiKey=${API_KEY}&addRecipeNutrition=true&offset=0&number=10&limitLicense=true`);
        setRecipes(res.data.results);
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
      }
    }
    getAllRecipes()
  }, []);

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
        <RecipesWrapper recipes={recipes} />
       
      </div>
    </div>
  );
};

export default HomePage;
