import classNames from 'classnames';
import { FC } from 'react';
import Loader from '../Loader/Loader';
import s from './Button.module.scss';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;
  className?: string;
  onClick?: () => void | undefined;
};

const Button: FC<ButtonProps> = ({ children, loading, className, onClick, ...rest }) => {
  const btnClass = classNames(s.btn, className && className, loading && s.btn__loading);

  return (
    <button onClick={onClick} type='submit' className={btnClass} disabled={rest.disabled || loading} {...rest}>
      {loading ? <Loader size="s" className={s['loader--button']} /> : null}
      {children}
    </button>
  );
};

export default Button;
