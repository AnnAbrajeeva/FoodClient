import { FC } from 'react';
import Text from '../Text/Text';
import { Option } from './MultiDropdown';
import s from './MultiDropDown.module.scss';

type DropdownType = {
  value: Option;
  onChange: (value: Option) => void;
  selected: Option[];
};

const DropdownItem: FC<DropdownType> = ({ value, onChange, selected }) => {
  const color = selected.includes(value) ? 'secondary' : 'primary';
  return (
    <div onClick={() => onChange(value)} className={s.dropdown__item}>
      <Text color={color} className="p-16">
        {value.value}
      </Text>
    </div>
  );
};

export default DropdownItem;
