import * as React from 'react';
import { IconProps } from '../Icon';
import Icon from '../Icon/Icon';
import classNames from 'classnames';

const CheckIcon: React.FC<IconProps> = ({
  color,
  className,
  width,
  height,
  ...rest
}) => {
  const iconColor = color ? `var(--text-${color})` : '';
  const classes = classNames('icon', className);
  const widthIcon = width ? width : '24';
  const heightIcon = height ? height : '24';

  return (
    <Icon>
      <svg
        {...rest}
        className={classes}
        xmlns="http://www.w3.org/2000/svg"
        width={widthIcon}
        height={heightIcon}
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M4 11.6129L9.87755 18L20 7"
          stroke={iconColor || 'currentColor'}
          strokeWidth="2"
        />
      </svg>
    </Icon>
  );
};

export default CheckIcon;
