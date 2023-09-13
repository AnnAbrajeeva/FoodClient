import { memo } from 'react';
import { Link } from 'react-router-dom';
import Error from 'assets/img/error.jpg';
import Button from 'components/Button';
import Container from 'components/Container';
import Text from 'components/Text';
import styles from './NotFoundPage.module.scss';

const NotFoundPage = () => {
  return (
    <div className={styles.error}>
      <Container>
        <div className={styles.error__wrapper}>
          <div className={styles.error__img}>
            <img src={Error} alt="Page not found" />
          </div>
          <Text color="accent" className={styles.error__text} weight="bold" view="title">
            Sorry, page not found
          </Text>
          <Link to="/">
            <Button className={styles.error__link}>Go to home</Button>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default memo(NotFoundPage);
