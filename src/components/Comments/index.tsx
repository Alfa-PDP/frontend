import { Typography } from '@alfalab/core-components/typography';
import { Textarea } from '@alfalab/core-components/textarea';
import { IconButton } from '@alfalab/core-components/icon-button';
import { PaperAirplaneMIcon } from '@alfalab/icons-glyph/PaperAirplaneMIcon';
import { useState } from 'react';
import styles from './styles.module.scss';
import { formatDate } from '../../utils/formatDate';
import { Comment } from '../../store/alfa/types';
import { usePostCommentMutation } from '../../store/alfa/alfa.api';
import { useActions } from '../../hooks/actions';

interface Props {
  comments: Comment[];
  taskId: string;
}

export default function Comments({ comments, taskId }: Props) {
  const [loading, setLoading] = useState(false);
  const [textValue, setTextValue] = useState('');

  const { setInfoMessage } = useActions();

  const [postComment] = usePostCommentMutation();

  const handleClick = () => {
    setLoading(true);
    const time = new Date(Date.now()).toISOString();
    const data = {
      user_id: localStorage.getItem('user_id')!,
      text: textValue,
      created_at: time,
      updated_at: time,
    };

    postComment({ task_id: taskId, data })
      .unwrap()
      .then(() => {
        setTextValue('');
      })
      .catch((e) => {
        setInfoMessage({
          title: e.data.detail,
          visible: true,
          badge: 'negative',
        });
      })
      .finally(() => setLoading(false));
  };

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
        onChange={(e) => setTextValue(e.target.value)}
        rightAddons={
          <IconButton
            disabled={textValue.length === 0}
            view="primary"
            icon={PaperAirplaneMIcon}
            size="xs"
            alignIcon="right"
            loading={loading}
            onClick={() => handleClick()}
          />
        }
      />
    </section>
  );
}
