import { Input } from '@alfalab/core-components/input';
import { MagnifierMIcon } from '@alfalab/icons-glyph/MagnifierMIcon';

import TeamTable from '../../components/TeamTable/index';
import YearFilter from '../../components/YearFilter';

import styles from './styles.module.scss';

export default function MyTeamProgress() {
  return (
    <div className={styles.myTeamProgress}>
      <div className={styles.myTeamProgress__container}>
        <div className={styles.myTeamProgress__input}>
          <Input
            block
            label="Поиск по сотрудникам"
            size="s"
            leftAddons={<MagnifierMIcon color="#B3B3B3" />}
            style={{ maxWidth: '705px' }}
          />
        </div>
        <YearFilter />
      </div>
      <TeamTable />
    </div>
  );
}
