import { CircularProgressBar as ProgressBar } from '@alfalab/core-components/circular-progress-bar';
import { Typography } from '@alfalab/core-components/typography';
import styles from './styles.module.scss';

interface CircularProgressBarProps {
  percentage: number;
}

export default function CircularProgressBar({
  percentage,
}: CircularProgressBarProps) {
  return (
    <div className={styles.progress}>
      <Typography.Text weight="bold">Прогресс по ИПР</Typography.Text>
      <ProgressBar
        value={percentage}
        size="l"
        height={113}
        contentColor="primary"
        title={
          <Typography.Text weight="bold">{`${percentage}%`}</Typography.Text>
        }
      />
    </div>
  );
}
