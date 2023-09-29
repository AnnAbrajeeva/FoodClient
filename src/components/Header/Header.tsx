import { observer } from 'mobx-react-lite';
import { useCallback, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Favor from 'assets/img/favor.svg';
import Logo from 'assets/img/logo.svg';
import User from 'assets/img/user.svg';
import Chef from 'assets/img/chef.png';
import Burger from 'components/Burger';
import Container from 'components/Container';
import MobileNav from 'components/MobileNav';
import Navigation from 'components/Navigation';
import Text from 'components/Text';
import rootStore from 'store/RootStore/instance';
import styles from './Header.module.scss';

const Header = () => {
  const [isOpen, setOpen] = useState(false);
  const { favoriteIds } = rootStore.favoriteRecipesStore;

  const handleBurger = useCallback(() => {
    setOpen((val) => !val);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'scroll';
  }, [isOpen]);

  console.log(rootStore.userStore.user)

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
            <NavLink to="/auth">
              {rootStore.userStore.user ? (
                <img className={styles['header__user-icon']} src={Chef} alt="Chef" />
                ) : (
                <img className={styles['header__user-icon']} src={User} alt="login" />
              )}
            </NavLink>
            <Burger isOpen={isOpen} onChange={handleBurger} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default observer(Header);
