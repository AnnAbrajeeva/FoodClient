import classNames from 'classnames';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { navLinks } from 'components/Navigation/Navigation';
import style from './MobileNav.module.scss';

type MobileNavProps = {
  closeNav: () => void;
  isOpen: boolean;
};

const MobileNav: FC<MobileNavProps> = ({ closeNav, isOpen }) => {
  const setActive = ({ isActive }: { isActive: boolean }): string =>
    isActive ? style['navigation__link--active'] : style['navigation__link'];
  const classes = classNames(style.navigation, isOpen ? style['navigation--open'] : '');
  return (
    <>
      <div onClick={closeNav} className={style.overlay} />
      <nav onClick={closeNav} className={classes}>
        {navLinks.map((link) => {
          return (
            <NavLink onClick={closeNav} className={setActive} key={link.path} to={link.path}>
              {link.name}
            </NavLink>
          );
        })}
      </nav>
    </>
  );
};

export default MobileNav;
