import { FC } from "react";
import Text from "components/Text";
import styles from './Step.module.scss';

type StepProps = {
    index: number;
    value: string;
}

const Step: FC<StepProps> = ({value, index}) => {
    return (
        <div className={styles.step}>
            <Text view="p-16" weight="medium">{`Step ${index}`}</Text>
            <Text view="p-14">{value}</Text>
        </div>
    )
}

export default Step;