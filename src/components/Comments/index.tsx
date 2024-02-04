import { Typography } from '@alfalab/core-components/typography';
import { Textarea } from '@alfalab/core-components/textarea';
import { IconButton } from '@alfalab/core-components/icon-button';
import { PaperAirplaneMIcon } from '@alfalab/icons-glyph/PaperAirplaneMIcon';
import styles from './styles.module.scss';
import { formatDate } from '../../utils/formatDate';
import { Comment } from '../../store/alfa/types';

interface Props {
  comments: Comment[];
}

export default function Comments({ comments }: Props) {
  return (
    <section className={styles.comments}>
      {comments.map((comment) => (
        <div key={comment.id} className={styles.comment}>
          <div className={styles.comment__container}>
            <img
              className={styles.comment__avatar}
              src={comment.user.avatar}
              alt=""
            />
            <div>
              <Typography.Text
                view="primary-small"
                color="primary"
                tag="p"
                className={styles.comment__author}
              >
                {`${comment.user.name} ${comment.user.family_name}`}
              </Typography.Text>
              <Typography.Text
                view="primary-small"
                color="secondary"
                tag="p"
                className={styles.comment__time}
              >
                {`${formatDate(comment.created_at)}`}
              </Typography.Text>
              <Typography.Text
                view="primary-medium"
                color="primary"
                tag="p"
                className={styles.comment__text}
              >
                {comment.text}
              </Typography.Text>
            </div>
          </div>
        </div>
      ))}
      <Textarea
        block
        className={styles.comment__input}
        placeholder="Введите ваш комментарий"
        rightAddons={
          <IconButton
            view="secondary"
            icon={PaperAirplaneMIcon}
            size="xs"
            alignIcon="right"
          />
        }
      />
    </section>
  );
}
