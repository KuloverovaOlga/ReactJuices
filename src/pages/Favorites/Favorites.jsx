import styles from './favorites.module.scss';

import { PageAnim } from '../../components/AnimBlocks/AnimBlocks';
import { useSelector, useDispatch } from 'react-redux';

import { AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';

import { FavoriteItemAnim } from '../../components/AnimBlocks/AnimBlocks';

import Card from '../../components/Card/Card';

import empty from '../../assets/img/emptyCartImg.svg';
function Favorites() {
  const { favoriteItems } = useSelector((state) => state.favorite);

  const products = favoriteItems.map((favoriteItem) => (
    <FavoriteItemAnim key={favoriteItem.unique}>
      <Card {...favoriteItem} />{' '}
    </FavoriteItemAnim>
  ));

  return (
    <section className={`${styles.section}`}>
      {favoriteItems.length <= 0 ? (
        <PageAnim key="favorityEmpty" className={`${styles.empty}`}>
          <div className={`${styles['empty-inner']} container flex-cc dc`}>
            <div className={`${styles['empty-text']} flex dc center `}>
              <p className="tl1">Нет избранных товаров</p>
              <p className={`${styles['empty-desc']} txt18`}>
                В Ваш список избранных товаров пока ничего не добавлено <br />
                Чтобы это исправить - Вы можете перейти к списку товаров на главной странице и выбрать понравившийся вкус.
              </p>
            </div>
            <div className={`${styles['empty-img']} `}>
              <img src={empty} alt="" />
            </div>

            <Link to="/" className={`${styles['empty-back']} blick-btn txt16`}>
              Вернуться на главную
            </Link>
          </div>
        </PageAnim>
      ) : (
        <PageAnim key="favority" className={`${styles.full}`}>
          <div className={`${styles.inner} container flex dc`}>
            <p className="tl1">Избранное</p>
            <div className={`${styles.list} grid`}>
              <AnimatePresence>{products}</AnimatePresence>
            </div>
          </div>
        </PageAnim>
      )}
    </section>
  );
}

export default Favorites;
