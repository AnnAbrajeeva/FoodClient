import classNames from 'classnames';
import React from 'react';
import CheckIcon from '../icons/CheckIcon/CheckIcon';
import s from './Checkbox.module.scss';

export type CheckBoxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  /** Вызывается при клике на чекбокс */
  onChange: (checked: boolean) => void;
};

const CheckBox: React.FC<CheckBoxProps> = ({ onChange, ...rest }) => {
  const isChecked = rest.checked ? rest.checked : false;
  const isDisabled = rest.disabled ? s['checkbox__box--disabled'] : '';
  const classes = classNames('checkbox__box', isDisabled, rest.className && s[rest.className]);

  return (
    <label className={s.checkbox}>
      <div className={classes}>
        {rest.checked && <CheckIcon className={s.checkbox__check} color="accent" width={40} height={40} />}
      </div>
      <input
        {...rest}
        onChange={() => onChange(!isChecked)}
        className={s.checkbox__input}
        type="checkbox"
        checked={isChecked}
        disabled={rest.disabled}
      />
    </label>
  );
};

export default CheckBox;
