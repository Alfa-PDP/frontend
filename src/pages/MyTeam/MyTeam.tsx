import { Typography } from '@alfalab/core-components/typography';
import { Outlet } from 'react-router-dom';
import styles from './styles.module.scss';

import MyTeamNav from '../../components/MyTeamNav';

export default function MyTeam() {
  return (
    <section className={styles.myTeam}>
      <Typography.Title tag="h1" view="large" weight="bold">
        Моя команда
      </Typography.Title>

      <MyTeamNav />

      <Outlet />
    </section>
  );
}
