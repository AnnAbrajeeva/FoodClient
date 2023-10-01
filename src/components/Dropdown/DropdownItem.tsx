import { FC } from 'react';
import Text from 'components/Text';
import { Option } from './Dropdown';
import s from './DropDown.module.scss';

type DropdownType = {
  value: Option;
  onChange: (value: Option) => void;
  selected: Option;
};

const DropdownItem: FC<DropdownType> = ({ value, onChange, selected }) => {
  const color = selected.key === value.key ? 'secondary' : 'primary';

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onChange(value);
  };

  return (
    <div onClick={handleClick} className={s.dropdown__item}>
      <Text color={color} className="p-16">
        {value.value}
      </Text>
    </div>
  );
};

export default DropdownItem;
