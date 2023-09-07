import Text from '../Text/Text';
import { Option } from './MultiDropdown';


type DropdownType = {
    value: Option;
    onChange: (value: Option) => void;
    selected: Option[];
  };
  
  const DropdownItem: React.FC<DropdownType> = ({
    value,
    onChange,
    selected,
  }) => {
    const color = selected.includes(value) ? 'secondary' : 'primary';
    return (
      <div onClick={(e) => onChange(value)} className="dropdown__item">
        <Text color={color} className="p-16">
          {value.value}
        </Text>
      </div>
    );
  };

  export default DropdownItem;