import classNames from 'classnames';
import { ChangeEventHandler, forwardRef } from 'react';
import s from './Input.module.scss';
import { ChangeHandler } from 'react-hook-form';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  /** Значение поля */
  value?: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: ChangeEventHandler<HTMLInputElement>;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
};

// eslint-disable-next-line react/display-name
const Input = forwardRef<HTMLInputElement, InputProps>(({ value, onChange, afterSlot, ...rest }, ref) => {
  const classes = classNames(s.input__text, rest.className);

  return (
    <div className={s.input}>
      <input
        {...rest}
        ref={ref}
        className={classes}
        onChange={onChange}
        value={value}
        placeholder={rest.placeholder || ''}
        disabled={rest.disabled}
        autoComplete="new-password"
      />
      {afterSlot && <div className={s.input__icon}>{afterSlot}</div>}
    </div>
  );
});

export default Input;
