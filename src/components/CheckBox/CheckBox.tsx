import React from 'react';
import CheckIcon from '../icons/CheckIcon/CheckIcon';
import './Checkbox.scss';
import classNames from 'classnames';

export type CheckBoxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> & {
  /** Вызывается при клике на чекбокс */
  onChange: (checked: boolean) => void;
};

const CheckBox: React.FC<CheckBoxProps> = ({ onChange, ...rest }) => {
  const isChecked = rest.checked ? rest.checked : false;
  const disabled = rest.disabled ? 'checkbox__box--disabled' : '';
  const classes = classNames('checkbox__box', disabled, rest.className);
  return (
    <label className="checkbox">
      <div className={classes}>
        {rest.checked && (
          <CheckIcon
            className="checkbox__check"
            color="accent"
            width={40}
            height={40}
          />
        )}
      </div>
      <input
        {...rest}
        onChange={() => onChange(!isChecked)}
        className="checkbox__input"
        type="checkbox"
        checked={isChecked}
        disabled={rest.disabled}
      />
    </label>
  );
};

export default CheckBox;
