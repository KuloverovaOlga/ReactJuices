import styles from './footer.module.scss';
// import cart from "../../assets/img/cart.svg";
import Logo from '../Logo/Logo';

function Footer() {

  return (
    <footer className={`${styles.section}`}>
      <div className={`${styles.inner} container flex cv sb`}>
        <p className="tl2">2025г</p>
        <Logo linkClass={'isFooter'} />
      </div>
    </footer>
  );
}

export default Footer;
