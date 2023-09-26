import classNames from 'classnames';
import * as React from 'react';
import { IconProps } from '../Icon';
import Icon from '../Icon/Icon';
import s from './ArrowDownIcon.module.scss';

const ArrowDownIcon: React.FC<IconProps> = ({ color, className, width, height, ...rest }) => {
  const iconColor = color && s[`icon--${color}`];
  const classes = classNames('icon', className, iconColor);

  return (
    <Icon>
      <svg
        {...rest}
        className={classes}
        xmlns="http://www.w3.org/2000/svg"
        width={width || '24'}
        height={height || '24'}
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2.33563 8.74741L3.66436 7.25259L12 14.662L20.3356 7.25259L21.6644 8.74741L12 17.338L2.33563 8.74741Z"
        />
      </svg>
    </Icon>
  );
};

export default ArrowDownIcon;
