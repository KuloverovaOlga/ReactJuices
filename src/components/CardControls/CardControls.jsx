import styles from './cardControls.module.scss';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { typesTitle } from '../Card/Card';

function CardControls(props) {
  const dispatch = useDispatch();

  const itemCount = props.cartItem ? props.cartItem.itemCount : 0;

  return (
    <div className={`${styles.info} flex dc`} onClick={(e) => e.preventDefault()}>
      <div className={`${styles.selector} flex dc`}>
        <ul className={`${styles.list} flex cv`}>
          {props.currentProduct &&
            props.currentProduct.types.map((item, i) => (
              <li
                key={i}
                className={`${styles['list-item']} txt14 max center ${props.typesIndex === i && styles.isActive}`}
                onClick={() => props.clickTypes(i)}
              >
                {typesTitle[item]}
              </li>
            ))}
        </ul>

        <ul className={`${styles.list} flex cv`}>
          {props.currentProduct &&
            props.currentProduct.sizes.map((size, sizeIdx) => {
              const cartItem = props.cartItems.find(
                (item) =>
                  item.unique === props.currentProduct.unique &&
                  item.sizesIndex === sizeIdx &&
                  item.typesIndex === props.typesIndex
              );
              const itemCount = cartItem ? cartItem.itemCount : 0;

              return (
                <li
                  key={sizeIdx}
                  className={`${styles['list-item']} txt14 max center ${props.sizesIndex === sizeIdx && styles.isActive}`}
                  onClick={() => props.clickSizes(sizeIdx)}
                >
                  {size}мл
                  <span className={`${styles.count}  ${itemCount && styles.isActive}`}>{itemCount}</span>
                </li>
              );
            })}
        </ul>
      </div>

      <div className={` flex cv sb`}>
        <p className={` tl3`}>{props.checkedPrice} ₽</p>
        <button className={`${styles.add} blick-btn flex cv ${itemCount > 0 && styles.isAdded}`} onClick={props.clickCartAdd}>
          <div className={`${styles.plus}`}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
          </div>
          <p className="txt14">Добавить</p>
          <div className={`${styles.num} flex-cc`}>
            <p className="txt13">{itemCount}</p>
          </div>
        </button>
      </div>
    </div>
  );
}

export default CardControls;
