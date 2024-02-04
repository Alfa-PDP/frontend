import { useParams } from 'react-router-dom';
import { Typography } from '@alfalab/core-components/typography';
import { useSelector } from 'react-redux';
import EmployeeCard from '../../components/EmployeeCard';
import styles from './styles.module.scss';
import ProfessionalAttributes from '../../components/ProfessionalAttributes';
import TaskList from '../../components/TaskList';
import MyCard from '../../components/MyCard';
import { useGetIndividualPlanQuery } from '../../store/alfa/alfa.api';
import { RootState } from '../../store';

export default function MyProgress() {
  // Получаем id через useParams
  const { id } = useParams<{ id: string }>();

  // Получаем роль из localStorage
  const role = localStorage.getItem('role');

  // Получаем год из стора
  const yearIdp = useSelector((state: RootState) => state.filteredYear);

  // Запрос на получение плана
  const { data: workerData } = useGetIndividualPlanQuery({
    user_id: id || '',
    year: yearIdp.filteredYear,
  });

  return (
    workerData && (
      <div className={styles.progress}>
        <Typography.Title
          tag="h1"
          weight="bold"
          view="large"
          className={styles.progress__title}
        >
          {role === 'worker' ? 'Мой прогресс' : `Индивидуальный план развития`}
        </Typography.Title>
        {role === 'worker' ? (
          <MyCard data={workerData} />
        ) : (
          workerData && <EmployeeCard data={workerData} />
        )}
        <ProfessionalAttributes role={role || ''} />
        <TaskList />
      </div>
    )
  );
}
