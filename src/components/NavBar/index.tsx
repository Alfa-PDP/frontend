import { NavLink } from 'react-router-dom';
import { Typography } from '@alfalab/core-components/typography';
import { useSelector } from 'react-redux';
import {
  navItemsLeaderData,
  navItemsWorkerData,
} from '../../utils/navItemsData';

import styles from './styles.module.scss';
import { BackButton } from '../BackButton';
import { RootState } from '../../store';

export default function NavBar() {
  const user = useSelector((state: RootState) => state.user);

  const data = user.role === 'leader' ? navItemsLeaderData : navItemsWorkerData;

  return (
    <nav className={styles.nav}>
      <BackButton />
      <ul className={styles.nav__list}>
        {data.map((el, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={index}>
            <NavLink
              to={
                user.role === 'leader'
                  ? `${el.path}`
                  : `${el.path}${localStorage.getItem('user_id')}`
              }
              className={({ isActive }) => {
                return `${styles.nav__listItem} ${isActive && `${styles.nav__listItem_active}`}`;
              }}
            >
              <img src={el.icon} alt="" />
              <Typography.Text view="primary-small" weight="bold">
                {el.text}
              </Typography.Text>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
