import classNames from 'classnames';
import { forwardRef } from 'react';
import s from './Input.module.scss';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
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
        onChange={(e) => onChange(e.target.value)}
        value={value}
        placeholder={rest.placeholder || ''}
        type="text"
        disabled={rest.disabled}
      />
      {afterSlot && <div className={s.input__icon}>{afterSlot}</div>}
    </div>
  );
});

export default Input;
