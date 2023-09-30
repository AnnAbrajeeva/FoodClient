import rootStore from 'store/RootStore/instance';
import Text from 'components/Text';
import s from './UserMenu.module.scss';
import { FC, useEffect, useRef } from 'react';
import classNames from 'classnames';

type UserMenuProps = {
  isOpen: boolean;
  handleClose: (value: boolean) => void;
};

const UserMenu: FC<UserMenuProps> = ({ isOpen, handleClose }) => {
  



  const username = `${rootStore.userStore.user?.username} ${rootStore.userStore.user?.surname}`;

  const classes = classNames(s.menu, isOpen && s['menu--open']);

  return (
    <div className={classes}>
      <Text className={s.menu__name} weight="bold">
        {username}
      </Text>
      <div className={s.menu__logout} onClick={rootStore.userStore.logout}>
        <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.25 5.25L9 4.5H18L18.75 5.25V18.75L18 19.5H9L8.25 18.75V16.5H9.75V18H17.25V6H9.75V7.5H8.25V5.25Z"
            fill="#080341"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.06068 12.7499L14.25 12.7499L14.25 11.2499L7.06068 11.2499L8.78035 9.53027L7.71969 8.46961L4.18936 11.9999L7.71969 15.5303L8.78035 14.4696L7.06068 12.7499Z"
            fill="#080341"
          />
        </svg>
        <Text weight="bold">Logout</Text>
      </div>
    </div>
  );
};

export default UserMenu;
