import styles from './error.module.scss';

import { Link } from 'react-router-dom';

import { PageAnim } from '../../components/AnimBlocks/AnimBlocks';

import notFound from '../../assets/img/notFoundPage.svg';

function Error() {
  return (
    <PageAnim key="error">
      <div className={`${styles.section}`}>
        <div className={`${styles.inner} container flex-cc dc`}>
          <div className={`${styles.text} flex dc center cv`}>
            <p className={`${styles.title} tl1`}>404</p>
            <p className={`${styles.desc} txt18`}>Страница не найдена, или находится на этапе разработки</p>
          </div>
          <div className={`${styles.img}`}>
            <img src={notFound} alt="" />
          </div>

          <Link to="/" className={`${styles.back} blick-btn txt16`}>
            Вернуться на главную
          </Link>
        </div>
      </div>{' '}
    </PageAnim>
  );
}

export default Error;
