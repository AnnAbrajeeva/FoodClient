import { Link, NavLink } from 'react-router-dom';
import Favor from 'assets/img/favor.svg'
import User from 'assets/img/user.svg'
import Navigation from 'components/Navigation';
import Logo from '../../assets/img/logo.svg';
import Text from '../../components/Text';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <div className={styles.header}>
      <div className="container">
        <div className={styles.header__wrapper}>
          <Link to="/" className={styles.header__logo}>
            <img src={Logo} alt="Food Client" />
            <Text view='p-20' weight='bold'>Food Client</Text>
          </Link>
          <Navigation />
          <div className={styles.header__user}>
            <NavLink  to='/favorite'>
              <img className={styles["header__user-icon"]} src={Favor} alt="Favorite Recipes" />
            </NavLink>
             <NavLink  to='/login'>
              <img className={styles["header__user-icon"]} src={User} alt="Favorite Recipes" />
            </NavLink>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Header;
