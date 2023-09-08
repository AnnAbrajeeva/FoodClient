import Button from "components/Button";
import styles from './ActionSlot.module.scss';

const ActionSlot = () => {
    return (
        <Button className={styles["action-btn"]}>Save</Button>
    )
}

export default ActionSlot;