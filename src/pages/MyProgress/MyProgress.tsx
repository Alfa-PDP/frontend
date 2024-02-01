import { useParams } from 'react-router-dom';
import { Typography } from '@alfalab/core-components/typography';
import EmployeeCard from '../../components/EmployeeCard';
import styles from './styles.module.scss';
import ProfessionalAttributes from '../../components/ProfessionalAttributes';
import TaskTable from '../../components/TaskTable/index';
import YearFilter from '../../components/YearFilter';
import MyCard from '../../components/MyCard';

export default function MyProgress() {
  const { id } = useParams();
  const role = 'employee';
  return (
    <div className={styles.progress}>
      <Typography.Title
        tag="h1"
        weight="bold"
        view="large"
        className={styles.progress__title}
      >
        {role !== 'employee'
          ? 'Мой прогресс'
          : `Индивидуальный план развития ${id}`}
      </Typography.Title>
      {role !== 'employee' ? <MyCard /> : <EmployeeCard />}
      <ProfessionalAttributes role={role} />
      <YearFilter />
      <TaskTable />
    </div>
  );
}
