import { NavLink } from 'react-router-dom';
import style from './Navigation.module.scss';

export const navLinks = [
  {
    path: '/',
    name: 'Recipes',
  },
  {
    path: '/plan',
    name: 'Meal Planing',
  },
  {
    path: '/shopping-list',
    name: 'Shopping List',
  },
  {
    path: '/menu',
    name: 'Menu Items',
  },
];

const Navigation = () => {
  const setActive = ({ isActive }: { isActive: boolean }): string => (isActive ? style.active : '');
  return (
    <nav className={style.navigation}>
      {navLinks.map((link) => {
        return (
          <NavLink className={setActive} key={link.path} to={link.path}>
            {link.name}
          </NavLink>
        );
      })}
    </nav>
  );
};

export default Navigation;
