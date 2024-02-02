import { Circle } from '@alfalab/core-components/icon-view/circle';
import { Typography } from '@alfalab/core-components/typography';
import { Link as LinkAlfa } from '@alfalab/core-components/link';
import { ArrowLeftMIcon } from '@alfalab/icons-glyph/ArrowLeftMIcon';
import { Link, useNavigate } from 'react-router-dom';

import styles from './styles.module.scss';

export function BackButton() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <LinkAlfa
      leftAddons={
        <Circle size={32}>
          <ArrowLeftMIcon color="black" />
        </Circle>
      }
      onClick={goBack}
      Component={Link}
      className={styles.link}
    >
      <Typography.Text tag="div" view="primary-large" weight="bold">
        Назад
      </Typography.Text>
    </LinkAlfa>
  );
}
