import { Typography } from '@alfalab/core-components/typography';
import TelegramIcon from '../../assets/icons/IconTg.svg';
import EmailIcon from '../../assets/icons/IconMail.svg';
import PhoneIcon from '../../assets/icons/IconPhone.svg';
import styles from './styles.module.scss';

export interface DataProps {
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
  telegram: string;
  phone_number: string;
  email: string;
}

export default function InitialCard({ data }: { data: DataProps }) {
  console.log(data);
  return (
    <ul className={styles.employeeInitials}>
      <li className={styles.employeeInitials__contacts}>
        <img
          src={EmailIcon}
          className={styles.employeeInitials__contacts_image}
          alt="Иконка почты"
        />
        <Typography.Text
          color="primary"
          view="primary-small"
          style={{ fontSize: '12px' }}
        >
          {data.email}
        </Typography.Text>
      </li>
      <li className={styles.employeeInitials__contacts}>
        <img
          src={PhoneIcon}
          className={styles.employeeInitials__contacts_image}
          alt="Иконка телефона"
        />
        <Typography.Text
          color="primary"
          view="primary-small"
          style={{ fontSize: '12px' }}
        >
          {data.phone_number}
        </Typography.Text>
      </li>
      <li className={styles.employeeInitials__contacts}>
        <img
          src={TelegramIcon}
          className={styles.employeeInitials__contacts_image}
          alt="Логотип телеграма"
        />
        <Typography.Text
          color="primary"
          view="primary-small"
          style={{ fontSize: '12px' }}
        >
          {data.telegram}
        </Typography.Text>
      </li>
    </ul>
  );
}
