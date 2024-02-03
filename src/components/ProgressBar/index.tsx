import { ProgressBar as ProgressBarAlpha } from '@alfalab/core-components/progress-bar';
import { Typography } from '@alfalab/core-components/typography';
import styles from './styles.module.scss';

export default function ProgressBar({
  title,
  value,
  totalTasks,
  completedTasks,
}: {
  title: string;
  value: number;
  totalTasks: number;
  completedTasks: number;
}) {
  // Плюрализация количества задач
  function pluralizeTask(totalTask: number, completedTask: number) {
    if (completedTask % 10 === 1 && completedTask % 100 !== 11) {
      return `${completedTask} задача из ${totalTask}`;
    }
    if (
      [2, 3, 4].includes(completedTask % 10) &&
      ![12, 13, 14].includes(completedTask % 100)
    ) {
      return `${completedTask} задачи из ${totalTask}`;
    }
    return `${completedTask} задач из ${totalTask}`;
  }

  return (
    <div className={styles.progressBar}>
      <div className={styles.progressBar__container}>
        <Typography.Text
          tag="p"
          weight="medium"
          style={{ fontSize: '14px', margin: '0' }}
        >
          {title}
        </Typography.Text>
        <Typography.Text
          tag="p"
          style={{ fontSize: '12px', color: '#B3B3B3', margin: '0' }}
        >
          {pluralizeTask(totalTasks, completedTasks)}
        </Typography.Text>
      </div>
      <ProgressBarAlpha value={value} />
    </div>
  );
}
