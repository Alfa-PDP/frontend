import TeamTable from '../../components/TeamTable/index';
import YearFilter from '../../components/YearFilter';

import styles from './styles.module.scss';

export default function MyTeamProgress() {
  return (
    <div className={styles.myTeamProgress}>
      <div className={styles.myTeamProgress__container}>
        <YearFilter />
      </div>
      <TeamTable />
    </div>
  );
}
