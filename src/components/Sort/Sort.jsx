import styles from './sort.module.scss';

import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { setSortIndex } from '../../redux/slices/filterSlice';

export const sortList = [
  { name: 'популярности ', sort: '-rating' },
  { name: 'подешевле', sort: 'price' },
  { name: 'подороже', sort: '-price' },
  { name: 'заголовку (a-я)', sort: 'title' },
  { name: 'заголовку (я-а)	', sort: '-title' }
];

function Sort() {
  const sortIndex = useSelector((state) => state.filter.sortIndex);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = React.useState(false);

  const sortRef = React.useRef();

  const clickSortHead = () => {
    setIsOpen(!isOpen);
  };

  const clickSortItems = (i) => {
    dispatch(setSortIndex(i));
    setIsOpen(!isOpen);
  };

  const onClickBody = (e) => {
    const path = e.composedPath();
    if (!path.includes(sortRef.current)) {
      setIsOpen(false);

    }
  };

  React.useEffect(() => {
    document.body.addEventListener('click', onClickBody);
    return () => {
      document.body.removeEventListener('click', onClickBody);
    };
  }, []);

  return (
    <div className={`${styles.block} ${isOpen && styles.isOpen}`} ref={sortRef}>
      <div className={`${styles.head} flex cv`} onClick={clickSortHead}>
        <div className={`${styles.title} flex cv`}>
          <div className={`${styles.arr} flex-cc`}>
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                fill="#2C2C2C"
              />
            </svg>
          </div>
          <p className={`txt14`}>Сортировать по:</p>
        </div>
        <p className={`${styles.checked}  txt14`}>{sortList[sortIndex].name}</p>
      </div>
      <div className={`${styles.popup} `}>
        <ul className={`${styles.list} flex dc`}>
          {sortList.map((sortItem, i) => (
            <li
              className={`${styles.item} txt14 ${sortIndex === i && styles.isActive}`}
              key={i}
              onClick={() => clickSortItems(i)}
            >
              {sortItem.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sort;
