import { Outlet } from 'react-router-dom';
import styles from './styles.module.scss';
import Header from '../Header';
import Footer from '../Footer';
import NavBar from '../NavBar';

export default function Layout() {
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.layout__container}>
        <NavBar />
        <main className={styles.layout__main}>
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}
