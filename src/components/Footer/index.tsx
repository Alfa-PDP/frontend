import { Link } from 'react-router-dom';
import { Typography } from '@alfalab/core-components/typography';

import styles from './styles.module.scss';
import Logo from '../../assets/icons/Logo';
import Telegram from '../../assets/icons/Telegram';
import Vk from '../../assets/icons/Vk';
import Youtube from '../../assets/icons/Youtube';

const footerData = [
  'Главная',
  'Сервисы',
  'Контакты',
  'Подразделения',
  'Все о работе',
  'Академия',
  'SAP AXД',
  'Заказ HR-услуг',
  'Заказ IT-услуг',
  'WSS Docs',
  'Карьера в банке',
  'Сайт Альфа Банка',
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <ul className={styles.footer__list}>
        {footerData.map((el, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={index}>
            <Link to="/" className={styles.footer__link}>
              {el}
            </Link>
          </li>
        ))}
      </ul>
      <div className={styles.footer__container}>
        <div className={styles.footer__info}>
          <Link to="/">
            <Logo />
          </Link>
          <div className={styles.footer__infoContainer}>
            <Typography.Text color="secondary" view="primary-small">
              Мобильное приложение
            </Typography.Text>
            <Typography.Text color="tertiary" view="primary-small">
              Для iOS и Android
            </Typography.Text>
          </div>
        </div>
        <div className={styles.footer__socials}>
          <Telegram />
          <Vk />
          <Youtube />
        </div>
      </div>
    </footer>
  );
}
