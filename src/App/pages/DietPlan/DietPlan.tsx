import Text from 'components/Text';
import s from './DietPlan.module.scss';
import Input from 'components/Input';
import { useState } from 'react';
import { dietTypes } from 'config/dietTypes';
import Dropdown, { Option } from 'components/Dropdown';
import Container from 'components/Container';
import Button from 'components/Button';

const DietPlan = () => {
  const [calory, setCalory] = useState();
  const [diet, setDiet] = useState<Option>({ key: '', value: '' });

  return (
    <div className={s.diet}>
      <Container>
        <Text className={s.diet__title} tag="h1" view="title">
          Generate your meal plan with three meals per day
        </Text>

        <form className={s.diet__form}>
          <div className={s["diet__form-wrapper"]}>
            <label className={s.diet__label}>
              <Text className={s['diet__label-text']} view="p-20">
                What is the caloric target for one day?
              </Text>
              <Input type="number" placeholder="2000" value={calory} onChange={() => setCalory} required />
            </label>
            <label className={s.diet__label}>
              <Text className={s['diet__label-text']} view="p-20">
                Enter a diet that the meal plan has to adhere to.
              </Text>

              <Dropdown onChange={setDiet} value={diet} options={dietTypes} />
            </label>
          </div>
          <Button className={s.diet__btn}>Generate</Button>
        </form>
      </Container>
    </div>
  );
};

export default DietPlan;
