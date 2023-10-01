import { NavLink } from 'react-router-dom';
import style from './Navigation.module.scss';

export const navLinks = [
  {
    path: '/',
    name: 'Recipes',
  },
  {
    path: '/diet-plan',
    name: 'Meal Plan',
  },
  {
    path: '/products',
    name: 'Products',
  },
  {
    path: '/menu',
    name: 'Menu Items',
  },
  {
    path: '/plan',
    name: 'Meal Planning',
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
