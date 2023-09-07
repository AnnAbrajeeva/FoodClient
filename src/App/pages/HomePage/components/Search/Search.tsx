import SearchIcon from 'assets/img/search.svg';
import Button from 'components/Button';
import Input from 'components/Input';
import Text from 'components/Text';
import styles from './Search.module.scss';

type SearchProps = {
  value: string;
  onChange: (value: string) => void;
};

const Search = ({ value, onChange }: SearchProps) => {
  return (
    <div className={styles.search}>
      <Text className={styles.search__text} view="p-20">
        Find the perfect food and <span className={styles['search__text-underline']}>drink ideas</span> for every
        occasion, from <span className={styles['search__text-underline']}>weeknight dinners</span> to{' '}
        <span className={styles['search__text-underline']}>holiday feasts</span>.
      </Text>

      <div className={styles['search__input-wrapper']}>
        <Input className={styles.search__input} value={value} onChange={onChange} placeholder="Enter dishes" />
        <Button className={styles.search__btn}>
          <img src={SearchIcon} alt="Search dishes" />
        </Button>
      </div>
    </div>
  );
};

export default Search;
