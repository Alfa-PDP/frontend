import { Typography } from '@alfalab/core-components/typography';
import { MailLineMIcon } from '@alfalab/icons-glyph/MailLineMIcon';
import { PhoneLineMIcon } from '@alfalab/icons-glyph/PhoneLineMIcon';
import TelegramIcon from '../../assets/icons/TelegramIdpCard.svg';
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
          <Typography.Text weight="bold">
            {EmployeeData.surname} {EmployeeData.name} {EmployeeData.patronymic}
          </Typography.Text>
          <Typography.Text color="secondary" view="primary-small">
            {EmployeeData.position}
          </Typography.Text>
        </div>
        <ul className={styles.employee__container_contacts}>
          <li className={styles.employee__contacts}>
            <MailLineMIcon className={styles.employee__contacts_image} />
            <Typography.Text color="primary" view="primary-small">
              {EmployeeData.email}
            </Typography.Text>
          </li>
          <li className={styles.employee__contacts}>
            <PhoneLineMIcon className={styles.employee__contacts_image} />
            <Typography.Text color="primary" view="primary-small">
              {EmployeeData.phone}
            </Typography.Text>
          </li>
          <li className={styles.employee__contacts}>
            <img
              src={TelegramIcon}
              className={styles.employee__contacts_image}
              alt="Логотип телеграма"
            />
            <Typography.Text color="primary" view="primary-small">
              {EmployeeData.telegram}
            </Typography.Text>
          </li>
        </ul>
      </div>
      <CircularProgressBar percentage={EmployeeData.amountTasks} />
    </section>
  );
}
