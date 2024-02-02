import { Typography } from '@alfalab/core-components/typography';
import TelegramIcon from '../../assets/icons/IconTg.svg';
import EmailIcon from '../../assets/icons/IconMail.svg';
import PhoneIcon from '../../assets/icons/IconPhone.svg';
import styles from './styles.module.scss';

interface EmployeeDataProps {
  name: string;
  surname: string;
  patronymic: string;
  position: string;
  email: string;
  phone: string;
  telegram: string;
}

export default function InitialCard({
  EmployeeData,
}: {
  EmployeeData: EmployeeDataProps;
}) {
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
          {EmployeeData.email}
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
          {EmployeeData.phone}
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
          {EmployeeData.telegram}
        </Typography.Text>
      </li>
    </ul>
  );
}
