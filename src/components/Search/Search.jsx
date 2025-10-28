import styles from './search.module.scss';

import debounce from 'lodash.debounce';
import axios from 'axios';

import React from 'react';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/slices/searchSlice';
import { setUnique } from '../../redux/slices/currentProductSlice';

import imgBg from '../../assets/img/searchImgBg.svg';

function SearchItem({ title, imgHide, price, unique }) {
  const dispatch = useDispatch();

  const onClickCard = () => {
    dispatch(setUnique(unique));
    dispatch(setSearchValue(''));
  };

  return (
    <li className={`${styles.item}`}>
      <Link to={`/product/${unique}`} onClick={onClickCard} className={` flex cv gap20`}>
        <div className={`${styles.picture}`}>
          <div className={`${styles.bg}`}>
            <img src={imgBg} alt="" />
          </div>
          <div className={`${styles.img}`}>
            <img src={imgHide} alt="" />
          </div>
        </div>
        <div className={`${styles['popup-info']} gap12 flex cv sb max`}>
          <p className={`txt16 regular`}>{title}</p>
          <p className={`${styles.price} txt18 bold`}>от {price}₽</p>
        </div>
      </Link>
    </li>
  );
}

function Search() {
  const searchValue = useSelector((state) => state.search.searchValue);
  const [innerValue, setInnerValue] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);

  const dispatch = useDispatch();

  const searchRef = React.useRef();
  const inputRef = React.useRef();

  const [searchArr, setSearchArr] = React.useState([]);
  const [searchOpen, setSearchOpen] = React.useState(false);

  const searchDebounces = React.useCallback(
    debounce((value) => {
      dispatch(setSearchValue(value));
    }, 500),
    []
  );

  const onSearch = (value) => {
    searchDebounces(value);
    setInnerValue(value);
    setSearchOpen(value.length);
  };

  const clearSearch = () => {
    dispatch(setSearchValue(''));
    setInnerValue('');
    inputRef.current.focus();
  };

  const getSearchItems = async () => {
    setIsLoading(true);
    if (!searchValue) {
      setSearchArr([]);
      setSearchOpen(false);
      return;
    }
    const _title = searchValue ? `title=*${searchValue}` : '';
    const getSearchItems = await axios.get(`https://1cde94456f4371de.mokky.dev/allJuices?${_title}`);
    setSearchArr(getSearchItems.data);
    setIsLoading(false);
  };

  const onClickLabel = () => {
    searchValue && setSearchOpen(true);
  };

  const onClickBody = (e) => {
    const path = e.composedPath();
    if (!path.includes(searchRef.current)) {
      setSearchOpen(false);
    }
  };

  React.useEffect(() => {
    getSearchItems();
  }, [searchValue]);

  React.useEffect(() => {
    document.body.addEventListener('click', onClickBody);
        return () => {
      document.body.removeEventListener("click", onClickBody);
    };
  }, []);

  // const skeletons = [...new Array(4)].map((item, i) => <CardSkeleton key={i} />);
  const searchProducts = searchArr.map((searchJuice) => <SearchItem key={searchJuice.unique} {...searchJuice} />);
  return (
    <div className={`${styles.wrapper}`} ref={searchRef}>
      <label className={`${styles.label} flex cv relative ${innerValue && styles.isInput}`} onClick={onClickLabel}>
        <span className={`${styles.svg}`}>
          <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6.12214 5.25469e-09C7.19554 -4.8654e-05 8.24759 0.337848 9.15956 0.975558C10.0715 1.61327 10.8071 2.52541 11.2833 3.60904C11.7595 4.69267 11.9574 5.90466 11.8546 7.10823C11.7518 8.31181 11.3524 9.45905 10.7014 10.4205L14.3432 14.5245C14.4809 14.6802 14.5609 14.889 14.5668 15.1087C14.5728 15.3283 14.5043 15.5423 14.3753 15.7071C14.2463 15.8719 14.0664 15.9753 13.8722 15.9961C13.678 16.0169 13.484 15.9537 13.3297 15.8193L13.2575 15.7475L9.61421 11.6452C8.88708 12.2698 8.03837 12.6903 7.13831 12.872C6.23826 13.0537 5.31273 12.9914 4.43831 12.6901C3.56389 12.3889 2.76572 11.8574 2.10985 11.1397C1.45397 10.422 0.959254 9.53868 0.666624 8.56283C0.373994 7.58698 0.291867 6.54665 0.427038 5.52795C0.562209 4.50924 0.910792 3.54143 1.44394 2.70462C1.97709 1.8678 2.67949 1.18602 3.493 0.715706C4.30651 0.24539 5.20775 5.43643e-05 6.12214 5.25469e-09V5.25469e-09ZM6.12214 1.72983C5.00213 1.72983 3.92798 2.23102 3.13601 3.12314C2.34404 4.01525 1.89911 5.22522 1.89911 6.48687C1.89911 7.74851 2.34404 8.95849 3.13601 9.8506C3.92798 10.7427 5.00213 11.2439 6.12214 11.2439C7.24216 11.2439 8.31631 10.7427 9.10828 9.8506C9.90025 8.95849 10.3452 7.74851 10.3452 6.48687C10.3452 5.22522 9.90025 4.01525 9.10828 3.12314C8.31631 2.23102 7.24216 1.72983 6.12214 1.72983Z"
              fill="#ADADAD"
            />
          </svg>
        </span>
        <input
          ref={inputRef}
          value={innerValue}
          onInput={(e) => {
            onSearch(e.target.value);
          }}
          type="text"
          className={`${styles.input} txt14 regular`}
          placeholder="Поиск вашего вкуса..."
        />

        <button className={`${styles.clear} flex-cc `} onClick={clearSearch}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M9.0799 7.61553L6.6311 5.16673L9.07982 2.71801C10.0241 1.77376 8.55964 0.309342 7.6154 1.25359L5.16668 3.70231L2.71787 1.2535C1.77384 0.309466 0.309467 1.77384 1.2535 2.71787L3.70231 5.16668L1.25359 7.61539C0.309343 8.55964 1.77376 10.0241 2.71801 9.07982L5.16673 6.6311L7.61553 9.0799C8.55969 10.0241 10.0241 8.55969 9.0799 7.61553Z"
              fill="#B5B5B5"
            />
          </svg>
        </button>
      </label>

      <div className={`${styles.popup}  ${searchOpen && styles.isOpen}`}>
        <ul className={`${styles.list} search-list flex dc`}>
    

          { searchArr.length === 0 ? (
            <li className={`${styles['empty-item']} txt16`}>По запросу "{searchValue}" ничего не найдено </li>
          ) : (
            searchProducts
          )}
        </ul>
      </div>
    </div>
  );
}

export default Search;
