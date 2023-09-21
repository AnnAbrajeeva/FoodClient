import { useCallback, useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Favor from 'assets/img/favor.svg';
import User from 'assets/img/user.svg';
import Burger from 'components/Burger';
import Container from 'components/Container';
import MobileNav from 'components/MobileNav';
import Navigation from 'components/Navigation';
import Logo from '../../assets/img/logo.svg';
import Text from '../../components/Text';
import styles from './Header.module.scss';
import { StoresContext } from 'utils/favoriteContext';
import { observer } from 'mobx-react-lite';

const Header = () => {
  const [isOpen, setOpen] = useState(false);
  const { favoriteIds } = useContext(StoresContext);
  // const [favorite, setFavorite] = useState(0);

  // useEffect(() => {

  // })
  const handleBurger = useCallback(() => {
    setOpen((val) => !val);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'scroll';
  }, [isOpen]);

  return (
    <div className={styles.header}>
      <Container>
        <div className={styles.header__wrapper}>
          <Link to="/" className={styles.header__logo}>
            <img src={Logo} alt="Food Client" />
            <Text view="p-20" weight="bold">
              Food Client
            </Text>
          </Link>
          <Navigation />
          <MobileNav isOpen={isOpen} closeNav={handleBurger} />
          <div className={styles.header__user}>
            <NavLink className={styles['header__link-wrap']} to="/favorite">
              <img className={styles['header__user-icon']} src={Favor} alt="Favorite Recipes" />
              {favoriteIds.length > 0 && <div className={styles['header__icon-count']}>{favoriteIds.length}</div>}
            </NavLink>
            <NavLink to="/login">
              <img className={styles['header__user-icon']} src={User} alt="Favorite Recipes" />
            </NavLink>
            <Burger isOpen={isOpen} onChange={handleBurger} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default observer(Header);
