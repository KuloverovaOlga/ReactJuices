import styles from './cartItem.module.scss';

import React from 'react';

import { typesTitle } from '../Card/Card';

import { CartItemAnim } from '../AnimBlocks/AnimBlocks';

import imgBg from '../../assets/img/cartImgBg.svg';
import imgHide from '../../assets/img/appleH.png';
import plus from '../../assets/img/plus.svg';
import minus from '../../assets/img/minus.svg';
import remove from '../../assets/img/remove.svg';

import { useSelector, useDispatch } from 'react-redux';

import { removeCartItems, setTotalHeaderInfo, increaseCartItem, decreaseCartItem } from '../../redux/slices/cartSlice';

function CartItem({ imgHide, title, sizes, typesIndex, sizesIndex, unique, itemCount, checkedPrice }) {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const handleIncrease = () => {
    dispatch(increaseCartItem({ unique, sizesIndex, typesIndex }));
    dispatch(setTotalHeaderInfo()); // пересчёт totalPrice и totalItems
  };

  const handleDecrease = () => {
    dispatch(decreaseCartItem({ unique, sizesIndex, typesIndex }));
    dispatch(setTotalHeaderInfo());
  };
  const onClickRemoveBtn = () => {
    dispatch(removeCartItems({ unique, typesIndex, sizesIndex }));
    dispatch(setTotalHeaderInfo());
  };

  return (
    <CartItemAnim>
      <div className={`${styles.inner} flex cv sb`}>
        <div className={`${styles.content} flex cv `}>
          <div className={`${styles.picture}`}>
            <div className={`${styles.bg}`}>
              <img src={imgBg} alt="" />
            </div>
            <div className={`${styles.img}`}>
              <img src={imgHide} alt="" />
            </div>
          </div>
          <div className={`${styles.name} flex dc`}>
            <p className={` tl2`}>{title}</p>
            <p className={`${styles.desc} txt18`}>
              {typesTitle[typesIndex]} , {sizes[sizesIndex]} мл
            </p>
          </div>
        </div>
        <div className={`${styles.info} flex cv`}>
          <div className={`${styles.counter} flex cv`}>
            <button className={`${styles['counter-btn']}`} onClick={handleDecrease}>
              <img src={minus} alt="minus" />
            </button>
            <p className="tl3">{itemCount}</p>
            <button className={`${styles['counter-btn']}`} onClick={handleIncrease}>
              <img src={plus} alt="plus" />
            </button>
          </div>
          <p className="tl3">{checkedPrice * itemCount} ₽</p>
          <button className={`${styles.remove}`} onClick={onClickRemoveBtn}>
            <img src={remove} alt="remove" />
          </button>
        </div>
      </div>
    </CartItemAnim>
  );
}

export default CartItem;
