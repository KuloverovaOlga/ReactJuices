import styles from './cart.module.scss';

import { Link } from 'react-router-dom';

import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { PageAnim, CartItemAnim } from '../../components/AnimBlocks/AnimBlocks';
import { AnimatePresence } from 'motion/react';

import { removeAllCartItems } from '../../redux/slices/cartSlice';

import empty from '../../assets/img/emptyCartImg.svg';
import bgBottle from '../../assets/img/bottle.png';
import remove from '../../assets/img/remove.svg';

import CartItem from '../../components/CartItem/CartItem';

function Cart() {
  const { cartItems, totalPrice, totalItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const clickAllRemoveBtn = () => {
    dispatch(removeAllCartItems());
  };

  return (
    <section className={`${styles.section}`}>
      {cartItems.length <= 0 ? (
        <PageAnim key="cartEmpty" className={`${styles.empty}`}>
          <div className={`${styles['empty-inner']} container flex-cc dc`}>
            <div className={`${styles['empty-text']} flex dc center `}>
              <p className="tl1">Ваша корзина пуста</p>
              <p className={`${styles['empty-desc']} txt18`}>
                В корзину ничего не добавлено <br />
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
        <PageAnim key="cart" className={`${styles.full}`}>
          <div className={`${styles.inner} container flex`}>
            <div className={`${styles.left} flex dc`}>
              <div className={` flex cv sb`}>
                <p className={`tl1`}>Ваша корзина</p>
                <button className={`${styles.remove} flex cv`} onClick={clickAllRemoveBtn}>
                  <p className={`${styles['remove-text']} txt20`}>Удалить все</p>
                  <div className={`${styles['remove-svg']}`}>
                    <img src={remove} alt="remove all" />
                  </div>
                </button>
              </div>
              <div className={` flex dc`}>
                <AnimatePresence>
                  {cartItems.map((item, i) => (
                    <CartItem {...item} key={item.unique + item.sizesIndex + item.typesIndex} />
                  ))}
                </AnimatePresence>
              </div>
            </div>
            <div className={`${styles.right} flex dc`}>
              <Link to="/" className={`${styles.back} button-transform`}>
                <div className={`${styles['back-svg']}`}>
                  <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7 13L1 6.93015L6.86175 1"
                      stroke="#fff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p className={`txt16`}>Вернуться назад</p>
              </Link>

              <div className={`${styles.info}`}>
                <div className={`${styles.order} flex dc cv sb`}>
                  <div className={`${styles.det}`}>
                    <p className={`${styles['det-title']} center`}>итого</p>
                    <p className={`${styles['det-desc']} center`}>{totalItems} позиции на сумму:</p>
                    <p className={`${styles['det-count']} center`}>
                      {totalPrice}
                      <sup>₽</sup>
                    </p>
                  </div>
                  <button className={`${styles['order-btn']} blick-btn txt14`}>Оплатить сейчас</button>
                </div>

                <div className={styles.bottle}>
                  <img src={bgBottle} alt="bottle" />
                </div>
                <div className={styles['wave-box']}>
                  <svg width="213" height="388" viewBox="0 0 213 388" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_141577_12)">
                      <g className={`${styles.wave} ${styles['wave--one']}`}>
                        <path
                          d="M-455.08 120.069C-522.123 116.628 -633.594 158.996 -680.949 180.611L-823.736 1441.5C-688.868 1478.8 -606.521 1286.47 -453.081 1263.1C-313.251 1241.8 -86.9633 1505.98 153.326 1442.31C251.077 1416.41 273.792 1311.28 376.326 1301.46C462.171 1293.24 503.46 1387.34 595.326 1387.34C739.826 1387.35 811.232 1325.18 931.818 1387.34C1042.23 1444.27 1164.23 1465.72 1226.01 1442.31C1287.79 1418.91 1397.15 1443.5 1465.65 1365.39C1520.44 1302.9 1495.15 1198.59 1507.3 1215.66L1505.82 183.95C1415.68 188.815 1286.51 369.961 1118.83 369.961C905.826 369.961 864.824 254.265 816.976 234.724C769.128 215.183 718.013 222.048 673.146 219.747C612.73 216.649 537.3 153.717 459.326 165.961C386.439 177.406 345.584 256.669 275.326 254.961C205.068 253.252 204.928 193.17 126.87 153.095C48.8114 113.02 17.6067 143.856 -40.25 135.026C-96.4767 126.444 -164.305 127.403 -239.632 110.247C-317.784 92.4481 -371.278 124.371 -455.08 120.069Z"
                          fill="#20E5A0"
                          fillOpacity="0.4"
                        />
                        <path
                          d="M-455.08 120.069C-522.123 116.628 -633.594 158.996 -680.949 180.611L-823.736 1441.5C-688.868 1478.8 -606.521 1286.47 -453.081 1263.1C-313.251 1241.8 -86.9633 1505.98 153.326 1442.31C251.077 1416.41 273.792 1311.28 376.326 1301.46C462.171 1293.24 503.46 1387.34 595.326 1387.34C739.826 1387.35 811.232 1325.18 931.818 1387.34C1042.23 1444.27 1164.23 1465.72 1226.01 1442.31C1287.79 1418.91 1397.15 1443.5 1465.65 1365.39C1520.44 1302.9 1495.15 1198.59 1507.3 1215.66L1505.82 183.95C1415.68 188.815 1286.51 369.961 1118.83 369.961C905.826 369.961 864.824 254.265 816.976 234.724C769.128 215.183 718.013 222.048 673.146 219.747C612.73 216.649 537.3 153.717 459.326 165.961C386.439 177.406 345.584 256.669 275.326 254.961C205.068 253.252 204.928 193.17 126.87 153.095C48.8114 113.02 17.6067 143.856 -40.25 135.026C-96.4767 126.444 -164.305 127.403 -239.632 110.247C-317.784 92.4481 -371.278 124.371 -455.08 120.069Z"
                          fill="white"
                          fillOpacity="0.1"
                        />
                      </g>
                      <g className={`${styles.wave} ${styles['wave--two']}`}>
                        <path
                          d="M-597.277 313.262C-654.598 326.673 -695.759 324.56 -751.407 305.35L-787.658 1328.54C-738.826 1319.56 -621.094 1321.85 -540.824 1402.89C-440.487 1504.18 -337.682 1559.88 -245.394 1560.99C-41.9841 1563.44 -7.42617 1407.31 163.606 1380.49C274.911 1363.03 322.26 1362 421.106 1380.49C573.472 1408.98 639.413 1560.99 774.606 1560.99C893.606 1560.99 984.106 1466.99 1103.11 1466.99C1245.39 1466.99 1476.94 1298.22 1567.94 1298.4C1652.09 1274.9 1766.27 1269.5 1780.64 1229.35L1733.6 141.986C1692.71 177.979 1588.97 255.86 1499.03 257.296C1377.18 259.243 1162.81 87.7891 958.605 94.9864C804.238 100.427 738.533 203.248 623.498 211.079C531.47 217.344 485.173 305.299 390.935 287.134C320.162 273.492 307.105 209.302 246.427 189.172C177.506 166.307 149.407 215.588 47.4199 183.143C-48.0263 152.778 -83.3872 78.7678 -215.773 77.0726C-419.175 74.4682 -448.492 278.453 -597.277 313.262Z"
                          fill="url(#paint0_linear_141577_12)"
                          fillOpacity="0.5"
                        />
                        <path
                          d="M-597.277 313.262C-654.598 326.673 -695.759 324.56 -751.407 305.35L-787.658 1328.54C-738.826 1319.56 -621.094 1321.85 -540.824 1402.89C-440.487 1504.18 -337.682 1559.88 -245.394 1560.99C-41.9841 1563.44 -7.42617 1407.31 163.606 1380.49C274.911 1363.03 322.26 1362 421.106 1380.49C573.472 1408.98 639.413 1560.99 774.606 1560.99C893.606 1560.99 984.106 1466.99 1103.11 1466.99C1245.39 1466.99 1476.94 1298.22 1567.94 1298.4C1652.09 1274.9 1766.27 1269.5 1780.64 1229.35L1733.6 141.986C1692.71 177.979 1588.97 255.86 1499.03 257.296C1377.18 259.243 1162.81 87.7891 958.605 94.9864C804.238 100.427 738.533 203.248 623.498 211.079C531.47 217.344 485.173 305.299 390.935 287.134C320.162 273.492 307.105 209.302 246.427 189.172C177.506 166.307 149.407 215.588 47.4199 183.143C-48.0263 152.778 -83.3872 78.7678 -215.773 77.0726C-419.175 74.4682 -448.492 278.453 -597.277 313.262Z"
                          fill="url(#paint1_linear_141577_12)"
                          fillOpacity="0.6"
                        />
                        <path
                          d="M-597.277 313.262C-654.598 326.673 -695.759 324.56 -751.407 305.35L-787.658 1328.54C-738.826 1319.56 -621.094 1321.85 -540.824 1402.89C-440.487 1504.18 -337.682 1559.88 -245.394 1560.99C-41.9841 1563.44 -7.42617 1407.31 163.606 1380.49C274.911 1363.03 322.26 1362 421.106 1380.49C573.472 1408.98 639.413 1560.99 774.606 1560.99C893.606 1560.99 984.106 1466.99 1103.11 1466.99C1245.39 1466.99 1476.94 1298.22 1567.94 1298.4C1652.09 1274.9 1766.27 1269.5 1780.64 1229.35L1733.6 141.986C1692.71 177.979 1588.97 255.86 1499.03 257.296C1377.18 259.243 1162.81 87.7891 958.605 94.9864C804.238 100.427 738.533 203.248 623.498 211.079C531.47 217.344 485.173 305.299 390.935 287.134C320.162 273.492 307.105 209.302 246.427 189.172C177.506 166.307 149.407 215.588 47.4199 183.143C-48.0263 152.778 -83.3872 78.7678 -215.773 77.0726C-419.175 74.4682 -448.492 278.453 -597.277 313.262Z"
                          fill="white"
                          fillOpacity="0.2"
                        />
                      </g>
                    </g>
                    <defs>
                      <linearGradient
                        id="paint0_linear_141577_12"
                        x1="-252.393"
                        y1="35.9864"
                        x2="-127.893"
                        y2="1718.99"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0.635257" stopColor="#D9D9D9" stopOpacity="0" />
                        <stop offset="1" stopColor="#20E5A0" />
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_141577_12"
                        x1="307.106"
                        y1="29.4864"
                        x2="366.606"
                        y2="1280.99"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#20E5A0" />
                        <stop offset="0.53" stopColor="#D9D9D9" stopOpacity="0" />
                      </linearGradient>
                      <clipPath id="clip0_141577_12">
                        <rect width="508" height="388" fill="white" transform="translate(-151)" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </PageAnim>
      )}
    </section>
  );
}

export default Cart;
