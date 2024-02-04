import { Typography } from '@alfalab/core-components/typography';
import { Textarea } from '@alfalab/core-components/textarea';
import { IconButton } from '@alfalab/core-components/icon-button';
import { PaperAirplaneMIcon } from '@alfalab/icons-glyph/PaperAirplaneMIcon';
import { useState } from 'react';
import styles from './styles.module.scss';
import { formatDate } from '../../utils/formatDate';

import {
  useGetCommentsQuery,
  usePostCommentMutation,
} from '../../store/alfa/alfa.api';
import { useActions } from '../../hooks/actions';
import { Comment } from '../../store/alfa/types';

export default function Comments({ taskId }: { taskId: string }) {
  const [loading, setLoading] = useState(false);
  const [textValue, setTextValue] = useState('');

  const { setInfoMessage } = useActions();

  const [postComment] = usePostCommentMutation();
  const { data: comments } = useGetCommentsQuery({ task_id: taskId });
  const currentUser = localStorage.getItem('user_id');

  const handleClick = () => {
    setLoading(true);
    const time = new Date(Date.now()).toISOString();
    const data = {
      created_at: time,
      updated_at: time,
      user_id: currentUser!,
      text: textValue,
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

  const handleCommentUserName = ({ data }: { data: Comment }) => {
    if (currentUser && currentUser === data.user.id) {
      return 'Вы';
    }

    return `${data.user.name} ${data.user.family_name}`;
  };

  return (
    <section className={styles.comments}>
      {comments?.map((comment) => (
        <div key={comment.id} className={styles.comment}>
          <div className={styles.comment__container}>
            <img
              className={styles.comment__avatar}
              src={comment.user.avatar}
              alt=""
            />
            <span className={styles.comment__divider} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography.Text
                  view="primary-small"
                  color="primary"
                  tag="p"
                  className={styles.comment__author}
                >
                  {handleCommentUserName({ data: comment })}
                </Typography.Text>
                <Typography.Text
                  view="primary-small"
                  color="secondary"
                  tag="p"
                  className={styles.comment__time}
                >
                  {`${formatDate(comment.created_at)}`}
                </Typography.Text>
              </div>
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
        value={textValue}
        className={styles.comment__input}
        placeholder="Введите ваш комментарий"
        onChange={(e) => setTextValue(e.target.value)}
        rightAddons={
          <IconButton
            disabled={textValue.length === 0}
            icon={
              <PaperAirplaneMIcon
                color={textValue.length === 0 ? '#BFBFBF' : '#096AD9'}
              />
            }
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
