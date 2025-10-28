import styles from './allItems.module.scss';

import axios from 'axios';
import qs from 'qs';

import React from 'react';

import Categories from '../../components/Categories/Categories';
import Sort from '../../components/Sort/Sort';
import Card from '../../components/Card/Card';
import CardSkeleton from '../../components/Card/CardSkeleton';
import Pagination from '../../components/Pagination/Pagination';
import CountCard from '../../components/CountCard/CountCard';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setTotalPage, setLocationProp } from '../../redux/slices/filterSlice';

import { PageAnim } from '../../components/AnimBlocks/AnimBlocks';

import { sortList } from '../../components/Sort/Sort';
import { limitList } from '../../components/CountCard/CountCard';
import { categoriesList } from '../../components/Categories/Categories';

function AllItems() {
  const { sortIndex, catIndex, totalPage, currentPage, limit } = useSelector((state) => state.filter);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLocation = React.useRef(false);
  const isMount = React.useRef(false);

  const [juicesArr, setJuicesArr] = React.useState([]);
  const [isLoaded, setIsLoad] = React.useState(true);

  const getAllItems = async () => {
    const _filterBy = catIndex ? `category.id=${catIndex}` : '';
    const _sortBy = `sortBy=${sortList[sortIndex].sort}`;
    const _page = `page=${currentPage}`;
    const _limit = `limit=${limitList[limit]}`;

    setIsLoad(true);

    const allItems = await axios.get(`https://1cde94456f4371de.mokky.dev/allJuices?${_filterBy}&${_sortBy}&${_page}&${_limit}`);

    setJuicesArr(allItems.data.items);
    dispatch(setTotalPage(allItems.data.meta.total_pages));

    setIsLoad(false);

    // fetch(`https://1cde94456f4371de.mokky.dev/allJuices?${_filterBy}&${_sortBy}&${_page}&${_limit}`)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setJuicesArr(data.items);
    //     dispatch(setTotalPage(data.meta.total_pages));
    //     setIsLoad(false);
    //   });

    // window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    if (window.location.search) {
      const queryParseStr = qs.parse(window.location.search.substring(1));
      const obg = {
        currentPage: +queryParseStr.page,
        catIndex: +queryParseStr['category.id'],
        limit: limitList.findIndex((item) => item === +queryParseStr.limit),
        sortIndex: sortList.findIndex((item) => item.sort === queryParseStr.sortBy)
      };

      dispatch(setLocationProp(obg));
      isLocation.current = true;
    }
  }, []);

  React.useEffect(() => {
    if (!isLocation.current) {
      getAllItems();
    }
    isLocation.current = false;
  }, [catIndex, sortIndex, currentPage, limit]);

  React.useEffect(() => {
    if (isMount.current) {
      const queryStr = qs.stringify(
        {
          category: {
            id: catIndex
          },
          sortBy: sortList[sortIndex].sort,
          page: currentPage,
          limit: limitList[limit]
        },
        { allowDots: true }
      );
      navigate(`?${queryStr}`);
    }
    isMount.current = true;
  }, [catIndex, sortIndex, currentPage, limit]);

  const skeletons = [...new Array(4)].map((item, i) => <CardSkeleton key={i} />);
  const products = juicesArr.map((juice) => <Card key={juice.unique} {...juice} />);

  return (
    <PageAnim key="all">
      <div className={`${styles.section}`}>
        <div className={`${styles.inner} container flex dc`}>
          <div className={`${styles.nav} flex cv sb`}>
            <Categories />
            <Sort />
          </div>
          <p className={`tl1`}>{`${categoriesList[catIndex]} соки`}</p>
          <div className={`${styles.list} grid`}>{isLoaded ? skeletons : products}</div>
          <div className={` flex sb cv`}>
            {totalPage > 1 && <Pagination />}
            <CountCard />
          </div>
        </div>
      </div>
    </PageAnim>
  );
}

export default AllItems;
