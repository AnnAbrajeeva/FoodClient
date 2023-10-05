import { RecipeModel } from 'entites/Recipe';
import Text from 'components/Text';
import s from './SmallCard.module.scss';
import { FC } from 'react';
import Delete from 'assets/img/delete.svg';

type SmallCardProps = {
  product: RecipeModel;
};

const SmallCard: FC<SmallCardProps> = ({ product }) => {
  return (
    <div className={s.card}>
      <div className={s.card__delete}>
        <img src={Delete} alt="delete" />
      </div>
      <div className={s.card__img}>
        <img src={product.image} alt={product.title} />
      </div>
      <Text className={s.card__text} maxLines={2}>
        {product.title}
      </Text>
    </div>
  );
};

export default SmallCard;
