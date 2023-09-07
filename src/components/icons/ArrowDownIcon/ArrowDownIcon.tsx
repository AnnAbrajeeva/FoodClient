import * as React from 'react';
import { IconProps } from '../Icon';
import classNames from 'classnames';
import Icon from '../Icon/Icon';

const ArrowDownIcon: React.FC<IconProps> = ({
  color,
  className,
  width,
  height,
  ...rest
}) => {
  const iconColor = color ? `var(--text-${color})` : 'var(--text-secondary)';
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
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2.33563 8.74741L3.66436 7.25259L12 14.662L20.3356 7.25259L21.6644 8.74741L12 17.338L2.33563 8.74741Z"
          fill={iconColor}
        />
      </svg>
    </Icon>
  );
};

export default ArrowDownIcon;
