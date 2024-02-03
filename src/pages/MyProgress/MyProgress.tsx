import { useParams } from 'react-router-dom';
import { Typography } from '@alfalab/core-components/typography';
import EmployeeCard from '../../components/EmployeeCard';
import styles from './styles.module.scss';
import ProfessionalAttributes from '../../components/ProfessionalAttributes';

import TaskList from '../../components/TaskList';
import MyCard from '../../components/MyCard';
import { useGetIndividualPlanQuery } from '../../store/alfa/alfa.api';

export default function MyProgress() {
  const { id } = useParams();
  const role = localStorage.getItem('role');
  const workerData = useGetIndividualPlanQuery({
    user_id: id,
  });
  console.log(workerData);
  return (
    <div className={styles.progress}>
      <Typography.Title
        tag="h1"
        weight="bold"
        view="large"
        className={styles.progress__title}
      >
        {role === 'worker' ? 'Мой прогресс' : `Индивидуальный план развития`}
      </Typography.Title>
      {role === 'worker' ? <MyCard /> : <EmployeeCard />}
      <ProfessionalAttributes role={role || ''} />
      <TaskList />
    </div>
  );
}
