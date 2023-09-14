import { FC } from 'react';

export type IconProps = React.SVGAttributes<SVGElement> & {
  className?: string;
  color?: 'primary' | 'secondary' | 'accent';
  width?: number;
  height?: number;
};

const Icon: FC<React.PropsWithChildren<IconProps>> = ({ children }) => {
  return <div>{children}</div>;
};

export default Icon;
