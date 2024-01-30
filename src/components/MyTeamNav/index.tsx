/* eslint-disable react/no-array-index-key */
import { Typography } from '@alfalab/core-components/typography';
import { NavLink } from 'react-router-dom';

import styles from './styles.module.scss';

const data = [
  { title: 'Функциональная команда', url: 'functional' },
  { title: 'Административная команда', url: 'admin' },
  { title: 'Развитие команды', url: 'progress' },
  { title: 'Клиентский путь', url: 'client' },
  { title: 'Проектная команда', url: 'project' },
];

export default function MyTeamNav() {
  return (
    <nav className={styles.nav__links}>
      {data.map((el, index) => (
        <NavLink
          key={index}
          to={el.url}
          className={({ isActive }) => {
            return `${styles.nav__link} ${isActive && `${styles.nav__link_active}`}`;
          }}
        >
          <Typography.Text view="primary-large" tag="p" weight="regular">
            {el.title}
          </Typography.Text>
        </NavLink>
      ))}
    </nav>
  );
}
