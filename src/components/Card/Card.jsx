import styles from './card.module.scss';

import React from 'react';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { setUnique, setCurrentProduct } from '../../redux/slices/currentProductSlice';
import { setCartItems, setTotalHeaderInfo } from '../../redux/slices/cartSlice';
import { toggleFavoriteItems } from '../../redux/slices/favoriteSlice';
import { FavoriteBtn } from '../Btns/Btns';

import CardControls from '../CardControls/CardControls';

export const typesTitle = ['C сахаром', 'Без сахара'];

function Card(props) {
  const dispatch = useDispatch();

  const [typesIndex, setTypeIndex] = React.useState(0);
  const [sizesIndex, setSizesIndex] = React.useState(0);
  const [checkedPrice, setCheckedPrice] = React.useState(props.price[0]);

  const { cartItems } = useSelector((state) => state.cart);

  const favoriteItem = useSelector((state) => state.favorite.favoriteItems.find((item) => item.unique === props.unique));

  const cartItem = useSelector((state) =>
    state.cart.cartItems.find(
      (item) => item.unique === props.unique && item.sizesIndex === sizesIndex && item.typesIndex === typesIndex
    )
  );

  const itemCount = cartItem ? cartItem.itemCount : 0;

  const currentCard = { ...props, typesIndex, sizesIndex, checkedPrice, itemCount };

  const onClickCard = () => {
    dispatch(setCurrentProduct({ ...props, typesIndex, sizesIndex, checkedPrice, itemCount }));
    localStorage.setItem('currentProduct', JSON.stringify({ ...props, typesIndex, sizesIndex, checkedPrice, itemCount }));
  };

  const clickCartAdd = (e) => {
    e.preventDefault();
    dispatch(setCartItems(currentCard));
    dispatch(setTotalHeaderInfo());
  };

  const clickTypes = (i) => {
    setTypeIndex(i);
  };

  const clickSizes = (i) => {
    setSizesIndex(i);
    setCheckedPrice(props.price[i]);
  };

  const onFavoriteClick = (e) => {
    e.preventDefault();
    dispatch(toggleFavoriteItems(currentCard));
  };

  return (
    <li>
      <Link to={`/product/${props.unique}`} className={`${styles.item} flex dc`} onClick={onClickCard}>
        <div className={`${styles.picture}`}>
          {props.imgHide && (
            <div className={`${styles.img} ${styles['img--hide']}`}>
              <img src={props.imgHide} alt="title" />
            </div>
          )}
          <div className={`${styles.img} ${styles['img--show']}`}>
            <img src={props.imgShow} alt="title" />
          </div>

          <FavoriteBtn favoriteItem={favoriteItem} onFavoriteClick={onFavoriteClick} />
        </div>
        <div className={`${styles.content} flex dc`}>
          <h4 className={` tl2 center`}>{props.title}</h4>
          <CardControls
            currentProduct={currentCard}
            typesIndex={typesIndex}
            sizesIndex={sizesIndex}
            clickTypes={clickTypes}
            clickSizes={clickSizes}
            clickCartAdd={clickCartAdd}
            cartItem={cartItem}
            cartItems={cartItems}
            checkedPrice={checkedPrice}
          />
        </div>
      </Link>
    </li>
  );
}

export default Card;
