import { FC, memo } from 'react';
import { Link } from 'react-router-dom';
import ActionSlot from 'components/ActionSlot';
import CaptionSlot from 'components/CaptionSlot';
import Card from 'components/Card';
import ContentSlot from 'components/ContentSlot';
import NotFound from 'components/NotFound';
import Skeleton from 'components/Skeleton';
import { getProducts } from 'entites/Ingredient';
import { RecipeModel } from 'entites/Recipe';
import { Meta } from 'utils/meta';
import styles from './RecipesWrapper.module.scss';

type RecipesWrapperProps = {
  recipes: RecipeModel[];
  loading: Meta;
};

const RecipesWrapper: FC<RecipesWrapperProps> = ({ recipes, loading }) => {
  console.log(loading)
  return (
    <>
      <div className={styles['recipes-wrapper']}>
        {loading === Meta.loading
          ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
          : recipes.map(({ id, cookingMinutes, readyInMinutes, nutrition, title, image }) => (
              <Link key={id} to={`recipe/${id}`}>
                <Card
                  className={styles['recipes-wrapper__card']}
                  captionSlot={
                    cookingMinutes && cookingMinutes >= 1 ? (
                      <CaptionSlot timeToPrepare={cookingMinutes} />
                    ) : (
                      <CaptionSlot timeToPrepare={readyInMinutes} />
                    )
                  }
                  contentSlot={<ContentSlot options={nutrition.nutrients} />}
                  actionSlot={<ActionSlot id={id} />}
                  subtitle={nutrition.ingredients ? getProducts(nutrition.ingredients) : ''}
                  title={title}
                  image={image}
                />
              </Link>
            ))}
      </div>
      {(loading === Meta.success || loading === Meta.error) && recipes.length === 0 && <NotFound />}
    </>
  );
};

export default memo(RecipesWrapper);
