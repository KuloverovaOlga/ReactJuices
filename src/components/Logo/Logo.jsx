import styles from './logo.module.scss';

import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLocationProp } from '../../redux/slices/filterSlice';

import logo from '../../assets/img/logo.png';

function Logo({ linkClass = '' }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const onClickLogo = () => {
  //   dispatch(setLocationProp({ currentPage: 1, catIndex: 0, limit: 0, sortIndex: 1, navigate:'' }));
  //   navigate('');
  // };

  return (
    <Link to="/" className={`${styles.logo} ${styles[linkClass]} flex cv`}>
      <div className={`${styles.image}`}>
        <img src={logo} alt="" />
      </div>
      <div className={`${styles.info} flex dc`}>
        <p className={`${styles.text}`}>REACT juice </p>
        <p className={`${styles.desc} txt16 regular`}>вкуснейшие соки вселенной</p>
      </div>
    </Link>
  );
}

export default Logo;
