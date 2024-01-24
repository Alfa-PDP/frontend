import { Typography } from '@alfalab/core-components/typography';
import TeamTable from '../../components/TeamTable/index';
import styles from './styles.module.scss';

export default function MyTeam() {
  return (
    <section className={styles.myTeam}>
      <Typography.Title tag="h1" view="large" weight="bold">
        Моя команда
      </Typography.Title>

      <TeamTable />
    </section>
  );
}
