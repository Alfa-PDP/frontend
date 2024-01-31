import { Typography } from '@alfalab/core-components/typography';
import { Textarea } from '@alfalab/core-components/textarea';
import { IconButton } from '@alfalab/core-components/icon-button';
import { PaperAirplaneMIcon } from '@alfalab/icons-glyph/PaperAirplaneMIcon';
import styles from './styles.module.scss';
import { TaskComment } from '../../types/TaskComment';

interface Props {
  comments: TaskComment[];
}

export default function Comments({ comments }: Props) {
  return (
    <section className={styles.comments}>
      {comments.map((comment) => (
        <div key={comment.id} className={styles.comment}>
          <div className={styles.comment__container}>
            <img className={styles.comment__avatar} src="" alt="" />
            <div>
              <Typography.Text
                view="primary-small"
                color="primary"
                tag="p"
                className={styles.comment__author}
              >
                {comment.author}
              </Typography.Text>
              <Typography.Text
                view="primary-small"
                color="secondary"
                tag="p"
                className={styles.comment__time}
              >
                {comment.time}
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
        className={styles.comments__input}
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
