import styles from './pagination.module.scss';
import React from 'react';

import ReactPaginate from 'react-paginate';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPage } from '../../redux/slices/filterSlice';



function Pagination() {
  const {currentPage,totalPage} = useSelector((state) => state.filter);
  const dispatch = useDispatch();



  return (
    <div className={styles.pagination}>
      <ReactPaginate
        nextLabel=">"
        onPageChange={(e) => dispatch(setCurrentPage(e.selected + 1))}
        marginPagesDisplayed={1}
        pageRangeDisplayed={3}
        pageCount={totalPage}
        previousLabel="<"
        breakLabel="..."
        renderOnZeroPageCount={null}
        forcePage={currentPage - 1}
      />
    </div>
  );
}


export default Pagination;
