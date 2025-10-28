import styles from './header.module.scss';

import React from 'react';

import { Link, NavLink, useLocation } from 'react-router-dom';
import { HeaderAnim } from '../AnimBlocks/AnimBlocks';

import { useSelector, useDispatch } from 'react-redux';

import cart from '../../assets/img/cart.svg';

import Logo from '../Logo/Logo';
import Search from '../Search/Search';

function Header() {
  const { totalPrice, totalItems } = useSelector((state) => state.cart);

  return (
    <HeaderAnim key="header" styles={`${styles.section}`}>
      <div className={`${styles.inner} container flex cv sb relative`}>
        <Logo />
        <Search />
        <div className={`${styles.links} flex gap20 cv`}>
          <NavLink to="/favorites" className={`txt16 nav-link`}>
            Избранное
          </NavLink>

          <NavLink to="/contacts" className={`txt16 nav-link `}>
            Контакты
          </NavLink>
        </div>
        <Link to="/cart" className={`${styles.basket} blick-btn flex cv`}>
          <div className={`${styles.price} relative`}>
            <p className={`txt16`}>{totalPrice} ₽</p>
          </div>
          <div className={`${styles.count} flex cv `}>
            <div className={`${styles['cart-img']}`}>
              <img src={cart} alt="cart" />
            </div>
            <p className={`txt16`}>{totalItems}</p>
          </div>
        </Link>
      </div>
    </HeaderAnim>
  );
}

export default Header;
