import { Outlet } from 'react-router-dom';
import styles from './styles.module.scss';
import Header from '../Header';
import Footer from '../Footer';
import NavBar from '../NavBar';

export default function Layout() {
  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <NavBar />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
