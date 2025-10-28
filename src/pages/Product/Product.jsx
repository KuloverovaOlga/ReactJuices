import styles from './product.module.scss';

import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { setUnique, setCurrentProduct } from '../../redux/slices/currentProductSlice';
import { setCartItems, setTotalHeaderInfo } from '../../redux/slices/cartSlice';
import { toggleFavoriteItems } from '../../redux/slices/favoriteSlice';


import loader from '../../assets/img/loader.svg';

// import axios from 'axios';

import { ProductAnim } from '../../components/AnimBlocks/AnimBlocks';
import { FavoriteBtn } from '../../components/Btns/Btns';
import CardControls from '../../components/CardControls/CardControls';



import { typesTitle } from '../../components/Card/Card';

// dispatch(setUnique(currentProduct.unique));
function Product() {
  const dispatch = useDispatch();

  const { currentProduct, unique } = useSelector((state) => state.current);

  const [isLoaded, setisLoad] = React.useState(true);

  const [typesIndex, setTypeIndex] = React.useState(0);
  const [sizesIndex, setSizesIndex] = React.useState(0);
  const [checkedPrice, setCheckedPrice] = React.useState(currentProduct.price[0]);

  const { cartItems } = useSelector((state) => state.cart);
  const favoriteItem = useSelector((state) => state.favorite.favoriteItems.find((item) => item.unique === currentProduct.unique));

  const cartItem = useSelector((state) =>
    state.cart.cartItems.find(
      (item) => item.unique === currentProduct.unique && item.sizesIndex === sizesIndex && item.typesIndex === typesIndex
    )
  );

  const itemCount = cartItem ? cartItem.itemCount : 0;
  const currentCard = { ...currentProduct, typesIndex, sizesIndex, checkedPrice, itemCount };

  const clickTypes = (i) => {
    setTypeIndex(i);
  };
  const clickSizes = (i) => {
    setSizesIndex(i);
    setCheckedPrice(currentProduct.price[i]);
  };
  const clickCartAdd = () => {
    dispatch(setCartItems(currentCard));
    dispatch(setTotalHeaderInfo());
  };

  const onFavoriteClick = (e) => {
    e.preventDefault();
    dispatch(toggleFavoriteItems(currentCard));
  };

  const getOneItem = async () => {
    setisLoad(true);
    // const _unique = unique ? `unique=${unique}` : '';
    // dispatch(setCurrentProduct({}));
    // const oneItem = await axios.get(`https://1cde94456f4371de.mokky.dev/allJuices?${_unique}`);
    // dispatch(setCurrentProduct(oneItem.data[0]));
    // dispatch(setCurrentProduct(currentProduct));
    setisLoad(false);

    // fetch(`https://1cde94456f4371de.mokky.dev/allJuices?${_unique}`)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     dispatch(setCurrentProduct(data[0]));
    //     setisLoad(false);
    //   });
  };

  React.useEffect(() => {
    setTimeout(() => {
      getOneItem();
    }, 300);
  }, [unique]);

  return !isLoaded ? (
    <ProductAnim key={currentProduct} styles={`${styles.section}`}>
      <div className={`${styles.inner} container flex cv`}>
        <div className={`${styles.content}  flex dc relative`}>
          <p className="tl1">{currentProduct.title}</p>
          <div className={`${styles.stars}`} style={{ '--rating': `${currentProduct.rating}` }}></div>
          <p className="txt20">{currentProduct.desc}</p>
          <FavoriteBtn favoriteItem={favoriteItem} onFavoriteClick={onFavoriteClick} />
          <CardControls
            currentProduct={currentProduct}
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
        <div className={`${styles.img} container flex dc`}>
          <img src={currentProduct.imgHide} alt={currentProduct.title} />
        </div>
      </div>
      <div className={`${styles.bg}  flex dc`}>
        <img src={currentProduct.imgBg} alt={currentProduct.title} />
      </div>
    </ProductAnim>
  ) : (
    <div className={`${styles.section} flex-cc tl1`}>
      <div className={`${styles.svg}`}>
        <img src={loader} alt="" />
      </div>
    </div>
  );
}

export default Product;
