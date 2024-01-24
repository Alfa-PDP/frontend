import { Link } from 'react-router-dom';
import { Typography } from '@alfalab/core-components/typography';

import styles from './styles.module.scss';
import Logo from '../../assets/icons/Logo';

const listItems = ['Контакты', 'Все о работе', 'Подразделения'];

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <Link to="/" className={styles.header__logoContainer}>
          <Logo />
          <Typography.Title weight="bold" tag="div" view="xsmall">
            Alfa People
          </Typography.Title>
        </Link>

        <ul className={styles.header__list}>
          {listItems.map((el, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <li key={index}>
              <Link to="/" className={styles.header__link}>
                <Typography.Text
                  tag="span"
                  weight="bold"
                  style={{ fontSize: '14px', fontWeight: '600' }}
                >
                  {el}
                </Typography.Text>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
