import { NavLink } from 'react-router-dom';
import { Typography } from '@alfalab/core-components/typography';
import { navItemsLeaderData } from '../../utils/navItemsData';
import styles from './styles.module.scss';

export default function NavBar() {
  return (
    <nav>
      <ul className={styles.nav__list}>
        {navItemsLeaderData.map((el, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={index}>
            <NavLink
              to={el.path}
              className={({ isActive }) => {
                return `${styles.nav__listItem} ${isActive && `${styles.nav__listItem_active}`}`;
              }}
            >
              <img src={el.icon} alt="" />
              <Typography.Title
                tag="h2"
                view="xsmall"
                weight="bold"
                style={{ fontSize: '12px' }}
              >
                {el.text}
              </Typography.Title>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
