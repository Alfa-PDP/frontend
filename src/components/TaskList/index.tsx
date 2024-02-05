import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { Button } from '@alfalab/core-components/button';
import { Typography } from '@alfalab/core-components/typography';
import styles from './styles.module.scss';

import TaskTable from '../TaskTable';
import AddTaskModal from '../AddTaskModal';
import {
  useGetCurrentUserQuery,
  useGetTasksQuery,
} from '../../store/alfa/alfa.api';
import { useAppSelector } from '../../hooks/redux';
import { CURRENT_YEAR } from '../../utils/constants';

interface Props {
  idpId: string | unknown;
}

export default function TaskList({ idpId }: Props) {
  const { id } = useParams<{ id: string }>();
  const role = localStorage.getItem('role');

  const [modalAnatomy, setModalAnatomy] = useState(false);
  const { filteredYear: year } = useAppSelector((state) => state.filteredYear);

  const { data: tasks } = useGetTasksQuery({
    user_id: id || '',
    year: year || CURRENT_YEAR,
  });
  const { data: currentUser } = useGetCurrentUserQuery();

  const handleModalAnatomy = () => setModalAnatomy(!modalAnatomy);

  return (
    <section className={styles.taskList}>
      <div className={styles.taskList__headerContainer}>
        <Typography.Title tag="h2" view="medium" weight="bold">
          Список задач на {year} год
        </Typography.Title>
      </div>
      {currentUser && (
        <>
          {tasks && tasks.length > 0 ? (
            <TaskTable tasks={tasks} role={role} idpId={idpId} />
          ) : (
            <Typography.Text
              view="primary-medium"
              color="primary"
              tag="p"
              className={styles.taskList__noTasks}
            >
              Задач пока нет. Цели, сильные стороны и зоны развития вашего
              сотрудника помогут вам сформировать правильные задачи.
            </Typography.Text>
          )}
          {role !== 'worker' && (
            <Button
              view="primary"
              type="button"
              size="s"
              onClick={handleModalAnatomy}
              className={styles.taskList__addTask}
            >
              Добавить задачу
            </Button>
          )}
          <AddTaskModal
            modalAnatomy={modalAnatomy}
            handleModalAnatomy={handleModalAnatomy}
            idpId={idpId}
            edit={false}
          />
        </>
      )}
    </section>
  );
}
