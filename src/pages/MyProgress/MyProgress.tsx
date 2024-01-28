import { useParams } from 'react-router-dom';
import { Typography } from '@alfalab/core-components/typography';
import EmployeeCard from '../../components/EmployeeCard';
import styles from './styles.module.scss';
import ProfessionalAttributes from '../../components/ProfessionalAttributes';
import TaskTable from '../../components/TaskTable/index';
import YearFilter from '../../components/YearFilter';

export default function MyProgress() {
  const { userId } = useParams();

  return (
    <div className={styles.progress}>
      <Typography.Title
        tag="h1"
        weight="bold"
        view="large"
        className={styles.progress__title}
      >
        Индивидуальный план развития {userId}
      </Typography.Title>
      <EmployeeCard />
      <ProfessionalAttributes />
      <YearFilter />
      <TaskTable />
    </div>
  );
}
