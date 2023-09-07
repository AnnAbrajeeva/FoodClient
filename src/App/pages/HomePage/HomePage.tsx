import { useState } from 'react';
import HeroBg from 'assets/img/hero-bg.jpg';
import HeroText from 'assets/img/hero-text.svg';
import MultiDropdown, { Option } from 'components/MultiDropdown';
import Search from './components/Search/Search';
import styles from './HomePage.module.scss';

const HomePage = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<Option[]>([]);

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
  }
  return (
    <div className={styles.homepage}>
      <div className={styles.homepage__hero}>
        <img src={HeroBg} alt="Food" />
        <img className={styles['homepage__hero-text']} src={HeroText} alt="Recipes" />
      </div>
      <div className="container">
        <Search value={search} onChange={setSearch} />
        <MultiDropdown className={styles.homepage__category} getTitle={getTitle} options={options} value={category} onChange={setCategory} />
      </div>
    </div>
  );
};

export default HomePage;
