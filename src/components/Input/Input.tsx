import classNames from 'classnames';
import React from 'react';
import './Input.scss';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
};

// eslint-disable-next-line react/display-name
const Input = React.forwardRef<HTMLInputElement, InputProps>(({ value, onChange, afterSlot, ...rest }) => {
  const classes = classNames('input__text', rest.className);

  return (
    <div className='input'>
      <input
        {...rest}
        className={classes}
        onChange={(e) => onChange(e.target.value)}
        value={value}
        placeholder={rest.placeholder || ''}
        type="text"
        disabled={rest.disabled}
      />
      {afterSlot && <div className="input__icon">{afterSlot}</div>}
    </div>
  );
});

export default Input;
