import { FC } from "react";
import s from './Nutrients.module.scss';

type NutrientsProps = {
    title: string;
    value: number;
}

const Nutrients: FC<NutrientsProps> = ({title, value}) => {
    return (
        <div className={s.nutrients}>
            <div className={s.nutrients__title}>{title}</div>
            <div className={s.nutrients__value}>{value}</div>
        </div>
    )
}

export default Nutrients;