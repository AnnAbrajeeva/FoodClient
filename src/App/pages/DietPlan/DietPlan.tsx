import Text from 'components/Text';
import s from './DietPlan.module.scss';
import Input from 'components/Input';
import { useState } from 'react';
import { dietTypes } from 'config/dietTypes';
import Dropdown, { Option } from 'components/Dropdown';
import Container from 'components/Container';
import Button from 'components/Button';
import MealPlanesStore from 'store/MealPlanesStore';
import { useLocalStore } from 'hooks/useLocalStore';
import RecipesWrapper from './components/ResipesWrapper';
import { MealPlaneModel } from 'entites/MealPlane';
import { Meta } from 'utils/meta';
import Nutrients from './components/Nutrients';
import { observer } from 'mobx-react-lite';

const DietPlan = () => {
  const [calory, setCalory] = useState(0);
  const [diet, setDiet] = useState<Option>({ key: '', value: '' });
  const [list, setList] = useState<MealPlaneModel[]>([]);

  const mealPlanStore = useLocalStore(() => new MealPlanesStore());

  const generatePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (calory) {
      await mealPlanStore.fetchMealPlane({ calory, diet: diet.key });
    }

    mealPlanStore.list && setList(mealPlanStore.list.meals);
  };

  console.log(mealPlanStore.meta)

  const enterCalory = (value: number) => {
    setCalory(value);
  };

  return (
    <div className={s.diet}>
      <Container>
        <Text className={s.diet__title} tag="h1" view="title">
          Generate your meal plan with three meals per day
        </Text>

        <form onSubmit={generatePlan} className={s.diet__form}>
          <div className={s['diet__form-wrapper']}>
            <label className={s.diet__label}>
              <Text className={s['diet__label-text']} view="p-20">
                What is the caloric target for one day?
              </Text>
              <Input
                type="number"
                placeholder="2000"
                value={calory.toString()}
                onChange={(e) => enterCalory(+e.target.value)}
                required
              />
            </label>
            <label className={s.diet__label}>
              <Text className={s['diet__label-text']} view="p-20">
                Enter a diet that the meal plan has to adhere to.
              </Text>

              <Dropdown onChange={setDiet} value={diet} options={dietTypes} />
            </label>
          </div>
          <Button loading={mealPlanStore.meta === Meta.loading} className={s.diet__btn}>
            Generate
          </Button>
        </form>
        {<RecipesWrapper recipes={list} loading={mealPlanStore.meta} />}
        {mealPlanStore.list && (
          <div className={s.diet__nutrients}>
            {Object.entries(mealPlanStore.list.nutrients).map(([key, value]) => (
              <Nutrients key={key} title={key} value={value} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};

export default observer(DietPlan);
