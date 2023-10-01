import classNames from 'classnames';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Input from '../Input/Input';
import ArrowDownIcon from '../icons/ArrowDownIcon';
import DropdownItem from './DropdownItem';
import s from './DropDown.module.scss';

export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type DropdownProps = {
  className?: string;
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option;
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
};

const Dropdown: React.FC<DropdownProps> = ({
  className,
  options,
  value,
  onChange,
  disabled,
  ...rest
}) => {
  const ref = useRef<any>();

  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);

  const classes = classNames(s.dropdown, isOpen && s['dropdown--open'], disabled && s['dropdown--disable'], className);

  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  const handleInputChange = (value: string) => {
    const inputValue = value.toLowerCase();
    const filtered = options.filter((option) => option.value.toLowerCase().includes(inputValue));
    setFilteredOptions(filtered);
  };

  const selectItem = useCallback((option: Option) => {
    onChange(option);
  }, [isOpen]);

  const handleDropdown = (e: React.MouseEvent) => {
    if (!disabled && !isOpen) {
      setIsOpen(true);
    } else {
      setIsOpen(false)
    }
  };

  return (
    <div ref={ref} className={classes}>
      <div onClick={(e) => handleDropdown(e)}>
        <Input
        {...rest}
        className={className}   
        afterSlot={<ArrowDownIcon color="secondary" />}
        value={!isOpen && value ? value.value : ''}
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder={isOpen ? value.value : 'Diet'}
        disabled={disabled}
        required
      />
      </div>
      
      {isOpen && !disabled && (
        <div className={s.dropdown__box}>
          {filteredOptions.map((item: Option) => (
            <DropdownItem selected={value} onChange={selectItem} key={item.key} value={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
