import { FC } from "react";
import Text from "components/Text";
import styles from './RecipeParam.module.scss';

type RecipeParamProps = {
    title: string;
    param: string | number;
}

const RecipeParam: FC<RecipeParamProps> = ({title, param}) => {
    return (
        <div className={styles.param}>
            <Text view="p-16">{title}</Text>
            <Text  color="accent" view="p-16" weight="medium">{param}</Text>
        </div>
    )
}

export default RecipeParam;