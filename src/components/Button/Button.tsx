import classNames from 'classnames';
import React from 'react';
import Loader from '../Loader/Loader';
import './Button.scss';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({
  children,
  loading,
  className,
  onClick,
  ...rest
}) => {
  const btnloadingClass = loading ? 'btn__loading' : '';
  const btnClass = classNames('btn', className, btnloadingClass);

  return (
    <button
    onClick={!loading ? onClick : undefined}
    className={btnClass}
    disabled={rest.disabled || loading}
    {...rest}
    >
      {loading ? <Loader data-testid="loader" size="s" className="loader--button" /> : null}
      {children}
    </button>
  );
};

export default Button;
