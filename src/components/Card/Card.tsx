import classNames from 'classnames';
import React from 'react';
import Text from '../Text/Text';
import s from './Card.module.scss';

export type CardProps = {
  /** Дополнительный classname */
  className?: string;
  /** URL изображения */
  image: string;
  /** Слот над заголовком */
  captionSlot?: React.ReactNode;
  /** Заголовок карточки */
  title: React.ReactNode;
  /** Описание карточки */
  subtitle: React.ReactNode;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  contentSlot?: React.ReactNode;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
  /** Слот для действия */
  actionSlot?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({ className, image, captionSlot, title, subtitle, contentSlot, actionSlot }) => {
  const classes = classNames(s.card, className && className);

  const actionWithCard = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
  };
  return (
    <div className={classes}>
      <div className={s.card__img}>
        <img src={image} alt="product" />
      </div>

      <div className={s.card__content}>
        <div className={s.card__descr}>
          {captionSlot && (
            <Text weight="medium" color="secondary" view="p-14">
              {captionSlot}
            </Text>
          )}
          <Text data-testid="text" weight="medium" maxLines={2} color="primary" view="p-20">
            {title}
          </Text>
          <Text data-testid="text" maxLines={2} color="secondary" view="p-16">
            {subtitle}
          </Text>
        </div>
      </div>
      <div className={s.card__footer}>
        {contentSlot && (
          <Text className={s.card__price} weight="bold" color="primary" view="p-18">
            {contentSlot}
          </Text>
        )}
        <div onClick={(e) => actionWithCard(e)} className={s.card__action}>
          {actionSlot}
        </div>
      </div>
    </div>
  );
};

export default Card;
