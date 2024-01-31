import { Link } from 'react-router-dom';
import { Typography } from '@alfalab/core-components/typography';
import { Input } from '@alfalab/core-components/input';
import { Circle } from '@alfalab/core-components/icon-view/circle';
import { MagnifierMIcon } from '@alfalab/icons-glyph/MagnifierMIcon';
import { BellMIcon } from '@alfalab/icons-glyph/BellMIcon';
import { SelectionMaskMIcon } from '@alfalab/icons-glyph/SelectionMaskMIcon';

import styles from './styles.module.scss';
import Logo from '../../assets/icons/Logo';
import cat from '../../assets/icons/cat.png';

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
                <Typography.Text tag="span" weight="bold">
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
          fieldClassName={styles.header__searchInput}
          leftAddons={<MagnifierMIcon color="#B3B3B3" />}
        />
        <Circle size={48}>
          <BellMIcon color="#0E0E0E" />
        </Circle>

        <Circle
          size={48}
          imageUrl={cat}
          bottomAddons={<SelectionMaskMIcon color="#0CC44D" />}
        />
      </div>
    </header>
  );
}
