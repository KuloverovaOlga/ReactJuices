import styles from './countCard.module.scss';

import React from 'react';

import { AppContext } from '../App/App';

import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage, setLimit } from '../../redux/slices/filterSlice';

export const limitList = [4, 8, 12, 16, 20];

function CountCard() {
  const dispatch = useDispatch();
  const limit = useSelector((state) => state.filter.limit);

  const countCardRef = React.useRef();

  const [isOpen, setIsOpen] = React.useState(false);

  const clickCountHead = () => {
    setIsOpen(!isOpen);
  };

  const clickCountItems = (i) => {
    dispatch(setLimit(i));
    setIsOpen(!isOpen);
    dispatch(setCurrentPage(1));
  };

  const onClickBody = (e) => {
    const path = e.composedPath();

    if (!path.includes(countCardRef.current)) {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    document.body.addEventListener('click', onClickBody);
        return () => {
      document.body.removeEventListener("click", onClickBody);
    };
  }, []);

  
  return (
    <div className={`${styles.block} ${isOpen && styles.isOpen}`} ref={countCardRef}>
      <div className={`${styles.head} flex cv`} onClick={clickCountHead}>
        <div className={`${styles.title} flex cv`}>
          <p className={`txt14`}>{limitList[limit]}</p>
          <div className={`${styles.arr} flex-cc`}>
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                fill="#2C2C2C"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className={`${styles.popup} `}>
        <ul className={`${styles.list} flex dc`}>
          {limitList.map((CountItem, i) => (
            <li className={`${styles.item} txt14 ${limit === i && styles.isActive}`} key={i} onClick={() => clickCountItems(i)}>
              {CountItem}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CountCard;
