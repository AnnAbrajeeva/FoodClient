import { FC, memo } from 'react';
import { Link } from 'react-router-dom';
import ActionSlot from 'components/ActionSlot';
import CaptionSlot from 'components/CaptionSlot';
import Card from 'components/Card';
import NotFound from 'components/NotFound';
import Skeleton from 'components/Skeleton';
import { Meta } from 'utils/meta';
import styles from './RecipesWrapper.module.scss';
import { MealPlaneModel } from 'entites/MealPlane';

type RecipesWrapperProps = {
  recipes: MealPlaneModel[];
  loading: Meta;
};

const RecipesWrapper: FC<RecipesWrapperProps> = ({ recipes, loading }) => {
  return (
    <>
      <div className={styles['recipes-wrapper']}>
        {loading === Meta.loading
          ? [...new Array(3)].map((_, i) => <Skeleton key={i} />)
          : recipes.map((item) => (
              <Link key={item.id} to={`/recipe/${item.id}`}>
                <Card
                  className={styles['recipes-wrapper__card']}
                  captionSlot={<CaptionSlot timeToPrepare={item.readyInMinutes} />}
                  actionSlot={<ActionSlot id={item.id} />}
                  title={item.title}
                  image={item.img || ''}
                />
              </Link>
            ))}
      </div>
      {(loading === Meta.success || loading === Meta.error) && recipes.length === 0 && <NotFound />}
    </>
  );
};

export default memo(RecipesWrapper);
