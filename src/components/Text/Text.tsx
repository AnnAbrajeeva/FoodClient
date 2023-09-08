import classNames from 'classnames';
import * as React from 'react';
import './Text.scss';

export type TextProps = {
  /** Дополнительный класс */
  className?: string;
  /** Стиль отображения */
  view?: 'title' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
  /** Html-тег */
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
  /** Начертание шрифта */
  weight?: 'normal' | 'medium' | 'bold';
  /** Контент */
  children: React.ReactNode;
  /** Цвет */
  color?: 'primary' | 'secondary' | 'accent';
  /** Максимальное кол-во строк */
  maxLines?: number;
};

const Text: React.FC<TextProps> = ({
  className,
  view,
  tag,
  weight,
  children,
  color,
  maxLines,
  ...rest
}) => {
  const Element = tag ? tag : 'p';

  const weightText = {
    normal: 400,
    medium: 600,
    bold: 700
  }

  const styles = {
    fontWeight: weight ? weightText[weight] : 400,
    color: color ? `var(--text-${color})` : 'inherit',
    lineClamp: maxLines,
    WebkitLineClamp: maxLines,
    overflow: maxLines ? 'hidden': 'initial'
  };

  const classes = classNames('text', className, view && `text__view-${view}`);

  return (
    <Element className={classes} style={styles} {...rest}>
      {children}
    </Element>
  );
};

export default Text;
