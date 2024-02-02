import { Link } from 'react-router-dom';
import { Typography } from '@alfalab/core-components/typography';
import { Input } from '@alfalab/core-components/input';
import { Circle } from '@alfalab/core-components/icon-view/circle';
import { MagnifierMIcon } from '@alfalab/icons-glyph/MagnifierMIcon';
import { BellMIcon } from '@alfalab/icons-glyph/BellMIcon';

import styles from './styles.module.scss';
import Logo from '../../assets/icons/Logo';
import ProfileIcon from '../ProfileIcon/index';

const listItems = ['Контакты', 'Все о работе', 'Подразделения'];

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <Link to="/" className={styles.header__logoContainer}>
          <Logo />
          <Typography.Text weight="bold" tag="div" view="primary-large">
            Alfa People
          </Typography.Text>
        </Link>

        <ul className={styles.header__list}>
          {listItems.map((el, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <li key={index}>
              <Link to="/" className={styles.header__link}>
                <Typography.Text
                  view="primary-medium"
                  style={{ fontWeight: 600 }}
                >
                  {el}
                </Typography.Text>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.header__profileContainer}>
        <Input
          label="Поиск"
          size="s"
          leftAddons={<MagnifierMIcon color="#B3B3B3" />}
        />
        <Circle size={48}>
          <BellMIcon color="#0E0E0E" />
        </Circle>
        <ProfileIcon />
      </div>
    </header>
  );
}
