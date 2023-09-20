import { memo } from 'react';
import Button from 'components/Button';
import styles from './ActionSlot.module.scss';

const ActionSlot = () => <Button className={styles['action-btn']}>Save</Button>;

export default memo(ActionSlot);
