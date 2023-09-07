import React from 'react';
import Text from '../Text/Text';
import classNames from 'classnames';
import './Card.scss';

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

const Card: React.FC<CardProps> = ({
  className,
  image,
  captionSlot,
  title,
  subtitle,
  contentSlot,
  onClick,
  actionSlot,
  ...rest
}) => {
  const classes = classNames('card', className);
  return (
    <div onClick={onClick} className={classes}>
      <div className="card__img">
        <img src={image} alt="product" />
      </div>

      <div className="card__content">
        <div className="card__descr">
          {captionSlot && (
            <Text weight="medium" color="secondary" view="p-14">
              {captionSlot}
            </Text>
          )}
          <Text data-testid="text" weight="medium" maxLines={2} color="primary" view="p-20">
            {title}
          </Text>
          <Text data-testid="text" maxLines={3} color="secondary" view="p-16">
            {subtitle}
          </Text>
        </div>

        <div className="card__footer">
          {contentSlot && (
            <Text
              className="card__price"
              weight="bold"
              color="primary"
              view="p-18"
            >
              {contentSlot}
            </Text>
          )}
          <div className="card__action">{actionSlot}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
