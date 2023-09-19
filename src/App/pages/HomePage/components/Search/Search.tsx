import { useRef } from 'react';
import SearchIcon from 'assets/img/search.svg';
import Button from 'components/Button';
import Input from 'components/Input';
import Text from 'components/Text';
import DeleteIcon from 'components/icons/DeleteIcon';
import styles from './Search.module.scss';

type SearchProps = {
  value: string;
  onChange: (value: string) => void;
  getRecipes: () => void;
};

const Search = ({ value, onChange, getRecipes }: SearchProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const clearSearch = () => {
    onChange('');
    inputRef.current?.focus();
  };

  return (
    <div className={styles.search}>
      <Text className={styles['search__text']} view="p-20">
        Find the perfect food and <span className={styles['search__text-underline']}>drink ideas</span> for every
        occasion, from <span className={styles['search__text-underline']}>weeknight dinners</span> to{' '}
        <span className={styles['search__text-underline']}>holiday feasts</span>.
      </Text>

      <div className={styles['search__input-wrapper']}>
        <Input
          ref={inputRef}
          className={styles.search__input}
          value={value}
          afterSlot={value && <DeleteIcon onClick={clearSearch} className={styles.search__delete} />}
          onChange={onChange}
          placeholder="Enter dishes"
        />

        <Button onClick={getRecipes} className={styles.search__btn}>
          <img src={SearchIcon} alt="Search dishes" />
        </Button>
      </div>
    </div>
  );
};

export default Search;
