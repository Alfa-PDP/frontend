import { Typography } from '@alfalab/core-components/typography';
import InitialCard from '../InitialCard';
import styles from './styles.module.scss';
import CircularProgressBar from '../CircularProgressBar';

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

export default function EmployeeCard() {
  return (
    <section className={styles.employee}>
      <div className={styles.employee__container}>
        <img
          className={styles.employee__container_image}
          src={EmployeeData.photo}
          alt="Фотография пользователя"
        />
      </div>
      <div className={styles.employee__container_info}>
        <div className={styles.employee__container_initials}>
          <Typography.Text weight="bold" style={{ margin: '0' }}>
            {EmployeeData.surname} {EmployeeData.name} {EmployeeData.patronymic}
          </Typography.Text>
          <Typography.Text
            style={{ fontSize: '12px', margin: '0', lineHeight: '15px' }}
            color="secondary"
            view="primary-small"
          >
            {EmployeeData.position}
          </Typography.Text>
        </div>
        <InitialCard EmployeeData={EmployeeData} />
      </div>
      <CircularProgressBar percentage={EmployeeData.amountTasks} />
    </section>
  );
}
