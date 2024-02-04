import { Button } from '@alfalab/core-components/button';
import { useEffect, useState } from 'react';
import { Typography } from '@alfalab/core-components/typography';
import styles from './styles.module.scss';

import TaskTable from '../TaskTable';
import AddTaskModal from '../AddTaskModal';
import {
  useGetCurrentUserQuery,
  useGetTasksQuery,
} from '../../store/alfa/alfa.api';
import { useAppSelector } from '../../hooks/redux';

export default function TaskList() {
  const { data: currentUser } = useGetCurrentUserQuery();
  const [userId, setUserId] = useState('');
  const { data: tasks } = useGetTasksQuery(userId, { skip: !userId });
  const [modalAnatomy, setModalAnatomy] = useState(false);
  const { filteredYear: year } = useAppSelector((state) => state.filteredYear);

  useEffect(() => {
    if (currentUser && currentUser.user_id) {
      setUserId(currentUser.user_id);
    }
  }, [currentUser]);
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
            <TaskTable tasks={tasks} role={currentUser.is_leader} />
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
          {currentUser.is_leader && (
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
          />
        </>
      )}
    </section>
  );
}
