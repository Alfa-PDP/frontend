import { useParams } from 'react-router-dom';
import { Typography } from '@alfalab/core-components/typography';
import { Loader } from '@alfalab/core-components/loader';
import EmployeeCard from '../../components/EmployeeCard';
import styles from './styles.module.scss';
import ProfessionalAttributes from '../../components/ProfessionalAttributes';
import TaskList from '../../components/TaskList';
import MyCard from '../../components/MyCard';
import { useGetIndividualPlanQuery } from '../../store/alfa/alfa.api';
import { useAppSelector } from '../../hooks/redux';

export default function MyProgress() {
  // Получаем id через useParams
  const { id } = useParams<{ id: string }>();

  // Получаем роль из localStorage
  const role = localStorage.getItem('role');

  // Получаем год из стора
  const yearIdp = useAppSelector((state) => state.filteredYear);

  // Запрос на получение плана
  const { data: workerData, isLoading } = useGetIndividualPlanQuery({
    user_id: id || '',
    year: yearIdp.filteredYear,
  });

  const idpId = workerData?.id;

  return workerData && !isLoading ? (
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
      <TaskList idpId={idpId} />
    </div>
  ) : (
    <div className={styles.progress__loader}>
      <Loader />
    </div>
  );
}
