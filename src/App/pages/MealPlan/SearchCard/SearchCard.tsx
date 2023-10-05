import { RecipeModel } from 'entites/Recipe';
import Text from 'components/Text';
import s from './SearchCard.module.scss';
import { FC } from 'react';

type SearchCardProps = {
  product: RecipeModel;
  dragOverHandler: (e: any) => void;
  dragLeaveHandler: (e: any) => void;
  dragStartHandler: (e: any, product: RecipeModel) => void;
  dragEndHandler: (e: any) => void;
};

const SearchCard: FC<SearchCardProps> = ({
  dragOverHandler,
  dragLeaveHandler,
  dragStartHandler,
  dragEndHandler,
  product,
}) => {
  return (
    <div
      onDragOver={(e) => dragOverHandler(e)}
      onDragLeave={(e) => dragLeaveHandler(e)}
      onDragStart={(e) => dragStartHandler(e, product)}
      onDragEnd={(e) => dragEndHandler(e)}
      draggable={true}
      key={product.id}
      className={s.card}
    >
      <div className={s.card__img}>
        <img src={product.image} alt={product.title} />
      </div>
      <Text className={s.card__text} maxLines={2}>
        {product.title}
      </Text>
    </div>
  );
};

export default SearchCard;
