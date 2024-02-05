import { Typography } from '@alfalab/core-components/typography';
import InitialCard from '../InitialCard';
import styles from './styles.module.scss';
import CircularProgressBar from '../CircularProgressBar';

interface EmployeeCardProps {
  avatar: string;
  end_date: string;
  family_name: string;
  id: string;
  middle_name: string;
  name: string;
  position: string;
  start_date: string;
  task_count: number;
  task_progress: number;
}

export default function EmployeeCard({ data }: { data: EmployeeCardProps }) {
  return (
    <section className={styles.employee}>
      <div className={styles.employee__container}>
        <img
          className={styles.employee__container_image}
          src={data.avatar}
          alt="Фотография пользователя"
        />
      </div>
      <div className={styles.employee__container_info}>
        <div className={styles.employee__container_initials}>
          <Typography.Text weight="bold" style={{ margin: '0' }}>
            {data.family_name} {data.name} {data.middle_name}
          </Typography.Text>
          <Typography.Text
            style={{ fontSize: '12px', margin: '0', lineHeight: '15px' }}
            color="secondary"
            view="primary-small"
          >
            {data.position}
          </Typography.Text>
        </div>
        <InitialCard data={data} />
      </div>
      <CircularProgressBar percentage={data.task_progress} />
    </section>
  );
}
