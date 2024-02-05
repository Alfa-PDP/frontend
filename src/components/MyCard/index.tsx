/* eslint-disable react/no-array-index-key */
import { Typography } from '@alfalab/core-components/typography';
import { useEffect, useState } from 'react';
import CircularProgressBar from '../CircularProgressBar/index';
import styles from './styles.module.scss';
import ProgressBar from '../ProgressBar';
import { useGetTasksQuery } from '../../store/alfa/alfa.api';

interface MyCardProps {
  data: IndividualPlanWorker;
}

interface Task {
  name: string;
  description: string;
  start_time: string;
  end_time: string;
  id: string;
  idp_id: string;
  task_type: string;
  importance: string;
  status_id: string;
}

export interface Worker {
  name: string;
  family_name: string;
  middle_name: string;
  position: string;
  avatar: string;
  id: string;
  team_id: string;
  task_count: number;
  task_progress: number;
}

export interface IndividualPlanWorker extends Worker {
  user_id: string;
  start_date: string;
  end_date: string;
  year: number;
  tasks: Task[];
}

const titleProgressBar = [
  { title: 'Hard skills', totalTasks: 0, completedTasks: 0 },
  { title: 'Soft skills', totalTasks: 0, completedTasks: 0 },
  { title: 'Обучение', totalTasks: 0, completedTasks: 0 },
];

export default function MyCard({ data }: MyCardProps) {
  const [progressBars, setProgressBars] = useState(titleProgressBar);
  const { data: tasks } = useGetTasksQuery({
    user_id: data.user_id,
    year: data.year,
  });

  useEffect(() => {
    const updatedProgressBars = titleProgressBar.map((bar, index) => {
      const totalTasks =
        tasks?.filter(
          (task) => task.task_type.name === titleProgressBar[index].title
        ).length ?? 0;

      const completedTasks =
        tasks?.filter(
          (task) =>
            task.status.slug === 'completed' &&
            task.task_type.name === titleProgressBar[index].title
        ).length ?? 0;

      return {
        ...bar,
        totalTasks,
        completedTasks,
      };
    });

    setProgressBars(updatedProgressBars);
  }, [tasks]);

  return (
    <section className={styles.employee}>
      <CircularProgressBar percentage={data.task_progress} />
      <div className={styles.employee__container}>
        <Typography.Text weight="bold">Типы задач</Typography.Text>
        <div className={styles.employee__container_progressBar}>
          {progressBars.map((e, index) => {
            return (
              <ProgressBar
                key={index}
                title={e.title}
                value={(e.completedTasks / e.totalTasks) * 100}
                totalTasks={e.totalTasks}
                completedTasks={e.completedTasks}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
