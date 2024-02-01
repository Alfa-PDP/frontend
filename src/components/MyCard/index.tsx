/* eslint-disable react/no-array-index-key */
import { Typography } from '@alfalab/core-components/typography';
import CircularProgressBar from '../CircularProgressBar/index';
import styles from './styles.module.scss';
import ProgressBar from '../ProgressBar';

const EmployeeData = {
  name: 'Анастасия',
  surname: 'Никитина',
  patronymic: 'Андреевна',
  position: 'Системный аналитик',
  email: 'Anastasiya_mgr@gmail.com',
  phone: '+7 (921) 212-12-12',
  telegram: 'Anastasya_nikki',
  amountTasks: 12,
  photo:
    'https://img.freepik.com/free-photo/female-looking-directly-into-camera_273609-12389.jpg',
  role: 'employee',
};

const titleProgressBar = [
  { title: 'Hard skills', totalTasks: 3, completedTasks: 1 },
  { title: 'Soft skills', totalTasks: 5, completedTasks: 2 },
  { title: 'Обучение', totalTasks: 4, completedTasks: 2 },
];

export default function MyCard() {
  return (
    <section className={styles.employee}>
      <CircularProgressBar percentage={EmployeeData.amountTasks} />
      <div className={styles.employee__container}>
        <Typography.Text weight="bold">Типы задач</Typography.Text>
        <div className={styles.employee__container_progressBar}>
          {titleProgressBar.map((e, index) => {
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
