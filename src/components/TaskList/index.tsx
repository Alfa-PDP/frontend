import { Button } from '@alfalab/core-components/button';
import { useState } from 'react';
import { Typography } from '@alfalab/core-components/typography';
import styles from './styles.module.scss';
import YearFilter from '../YearFilter';
import TaskTable from '../TaskTable';
import AddTaskModal from '../AddTaskModal';

export default function TaskList() {
  const [modalAnatomy, setModalAnatomy] = useState(false);
  const handleModalAnatomy = () => setModalAnatomy(!modalAnatomy);

  return (
    <section className={styles.taskList}>
      <div className={styles.taskList__headerContainer}>
        <Typography.Title tag="h2" view="medium" weight="bold">
          Список задач
        </Typography.Title>
        <YearFilter />
      </div>
      <TaskTable />
      <Button
        view="primary"
        type="button"
        size="s"
        onClick={handleModalAnatomy}
        className={styles.taskList__addTask}
      >
        Добавить задачу
      </Button>
      <AddTaskModal
        modalAnatomy={modalAnatomy}
        handleModalAnatomy={handleModalAnatomy}
      />
    </section>
  );
}
