import { FormEvent, useEffect, useRef, useState } from 'react';
import SearchIcon from 'assets/img/search.svg';
import Button from 'components/Button';
import Input from 'components/Input';
import Text from 'components/Text';
import DeleteIcon from 'components/icons/DeleteIcon';
import { AutocompleteModel } from 'entites/Autocomlete';
import styles from './Search.module.scss';

type SearchProps = {
  value: string;
  onChange: (value: string) => void;
  getRecipes: () => void;
  completeList: AutocompleteModel[];
  setSearchValue: (e: React.MouseEvent<HTMLLIElement>) => void;
  deleteValue: () => void;
};

const Search = ({ value, onChange, getRecipes, completeList, setSearchValue, deleteValue }: SearchProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteBox = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && !autocompleteBox.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  const handleInputClick = () => {
    setIsOpen(true);
  };

  const selectValue = (e: React.MouseEvent<HTMLLIElement>) => {
    setIsOpen(!isOpen);
    setSearchValue(e);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    getRecipes();
  };

  return (
    <div className={styles.search}>
      <Text className={styles['search__text']} view="p-20">
        Find the perfect food and <span className={styles['search__text-underline']}>drink ideas</span> for every
        occasion, from <span className={styles['search__text-underline']}>weeknight dinners</span> to{' '}
        <span className={styles['search__text-underline']}>holiday feasts</span>.
      </Text>

      <form onSubmit={handleSubmit} ref={autocompleteBox} className={styles['search__input-wrapper']}>
        <div className={styles['search__input-box']}>
          <Input
            ref={inputRef}
            className={styles.search__input}
            value={value}
            afterSlot={value && <DeleteIcon onClick={deleteValue} className={styles.search__delete} />}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Enter dishes"
            onClick={handleInputClick}
          />
          {value && isOpen && (
            <ul className={styles['search__autocomplite']}>
              {completeList.map((item) => {
                return (
                  <li onClick={selectValue} key={item.id} className={styles['search__autocomplite-item']}>
                    {item.title}
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <Button onClick={getRecipes} className={styles.search__btn}>
          <img src={SearchIcon} alt="Search dishes" />
        </Button>
      </form>
    </div>
  );
};

export default Search;
