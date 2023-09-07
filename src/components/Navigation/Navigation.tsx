import { NavLink } from 'react-router-dom';
import style from './Navigation.module.scss';

const navLinks = [
  {
    path: '/',
    name: 'Recipes',
  },
  {
    path: '/ingradients',
    name: 'Ingradients',
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
    <div className={style.navigation}>
      {navLinks.map((link) => {
        return (
          <NavLink className={setActive} key={link.path} to={link.path}>
            {link.name}
          </NavLink>
        );
      })}
    </div>
  );
};

export default Navigation;
