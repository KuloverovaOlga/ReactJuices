import styles from './categories.module.scss';

import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { setCatIndex, setCurrentPage } from '../../redux/slices/filterSlice';

export const categoriesList = ['Все', 'Фруктовые', 'Овощные', 'Ягодные', 'Осветленные', 'С мякотью'];

function Categories() {
  const catIndex = useSelector((state) => state.filter.catIndex);
  const dispatch = useDispatch();

  const clickCat = (index) => {
    dispatch(setCatIndex(index));
    dispatch(setCurrentPage(1));
  };

  return (
    <ul className={`${styles.list} flex cv`}>
      {categoriesList.map((categoryItem, i) => (
        <li
          className={`${styles.item} button-transform txt16 ${catIndex === i && styles.isActive}`}
          key={i}
          onClick={() => clickCat(i)}
        >
          {categoryItem}
        </li>
      ))}
    </ul>
  );
}

export default Categories;
