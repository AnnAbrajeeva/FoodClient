import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import Input from '../Input/Input';
import ArrowDownIcon from '../icons/ArrowDownIcon';
import DropdownItem from './DropdownItem';
import './MultiDropDown.scss';

export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  className?: string;
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Возвращает строку которая будет выводится в инпуте. В случае если опции не выбраны, строка должна отображаться как placeholder. */
  getTitle: (value: Option[]) => string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  className,
  options,
  value,
  onChange,
  disabled,
  getTitle,
  ...rest
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>();

  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);

  const disableClass = disabled ? 'disable' : '';
  const classes = classNames(
    'dropdown',
    isOpen ? 'open' : '',
    disableClass,
    className
  );

  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && !(ref.current.contains(event.target))) {
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
    const filtered = options.filter((option) =>
      option.value.toLowerCase().includes(inputValue)
    );
    setFilteredOptions(filtered);
  };

  const selectItem = (option: Option) => {
    const optionIndex = value.findIndex((val) => val.key === option.key);
    let newValue;

    if (optionIndex >= 0) {
      newValue = value.filter((val) => val.key !== option.key);
    } else {
      newValue = [...value, option];
    }

    onChange(newValue);
  };

  const handleDropdown = () => {
    if (!disabled) {
      setIsOpen(true);
    }
  };

  return (
    <div ref={ref} className={classes}>
      <Input       
        {...rest}
        className={className}
        onClick={handleDropdown}
        afterSlot={<ArrowDownIcon />}
        value={!isOpen && value.length ? getTitle(value) : ''}
        onChange={(e) => handleInputChange(e)}
        placeholder={isOpen ? getTitle(value) : 'Categories'}
        disabled={disabled}
      />
      {(isOpen && !disabled) && (
        <div className="dropdown__box">
          {filteredOptions.map((item: Option) => (
            <DropdownItem
              selected={value}
              onChange={selectItem}
              key={item.key}
              value={item}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiDropdown;
