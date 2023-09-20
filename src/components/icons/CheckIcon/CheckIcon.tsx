import classNames from 'classnames';
import * as React from 'react';
import { IconProps } from '../Icon';
import Icon from '../Icon/Icon';
import s from './CheckIcon.module.scss'

const CheckIcon: React.FC<IconProps> = ({ color, className, width, height, ...rest }) => {
  const iconColor = color && s[`icon--${color}`];
  const classes = classNames(s['icon'], className, iconColor);

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
        <path d="M4 11.6129L9.87755 18L20 7" strokeWidth="2" />
      </svg>
    </Icon>
  );
};

export default CheckIcon;
