import { useState } from 'react';
import { Table } from '@alfalab/core-components/table';
import { Collapse } from '@alfalab/core-components/collapse';
import { Status } from '@alfalab/core-components/status';
import { Typography } from '@alfalab/core-components/typography';
import { ButtonDesktop } from '@alfalab/core-components/button/desktop';
import styles from './styles.module.scss';

import { usePatchTaskStatusMutation } from '../../store/alfa/alfa.api';
import { formatDate } from '../../utils/formatDate';
import { UserTask } from '../../store/alfa/types';
import Comments from '../Comments';
import { useActions } from '../../hooks/actions';
import AddTaskModal from '../AddTaskModal';

interface Props {
  tasks: UserTask[];
  role: string | unknown;
  idpId: string | unknown;
}

export default function TaskTable({ tasks, role, idpId }: Props) {
  const [taskData, setTaskData] = useState<UserTask | undefined>();
  const [patchTaskStatus] = usePatchTaskStatusMutation();
  const { setInfoMessage } = useActions();

  const [modalAnatomy, setModalAnatomy] = useState(false);

  const handleModalAnatomy = () => setModalAnatomy(!modalAnatomy);

  const handleEditClick = (task: UserTask) => {
    setTaskData(task);
    handleModalAnatomy();
  };

  // Отправка данных с кнопки на сервер
  const handleChangeWorkerStatus = (id: string) => {
    const status = { description: 'В работе' };
    patchTaskStatus({ task_id: id, status })
      .unwrap()
      .then(() => {
        setInfoMessage({
          title: 'Статус изменен',
          visible: true,
          badge: 'positive',
        });
      })
      .catch(() => {
        setInfoMessage({
          title: 'Статус не изменен',
          visible: true,
          badge: 'negative',
        });
      });
  };

  // Рендерить ли кнопку "Взять в работу"
  const renderStatusButton = (task: UserTask) => {
    return (
      task.status.slug === 'new' && (
        <ButtonDesktop
          size="xxs"
          view="primary"
          className={styles.table__taskButton}
          onClick={() => handleChangeWorkerStatus(task.id)}
        >
          Взять в работу
        </ButtonDesktop>
      )
    );
  };

  return (
    <div style={{ width: '100%', borderBottom: '1px solid #E7E8EB' }}>
      <Table wrapper={false}>
        <Table.THead>
          <Table.THeadCell className={styles.table__headCell}>
            <Typography.Text
              view="primary-small"
              color="primary"
              tag="span"
              weight="bold"
            >
              Задачи ({tasks.length})
            </Typography.Text>
          </Table.THeadCell>
          <Table.THeadCell className={styles.table__headCell} width={200}>
            <Typography.Text
              view="primary-small"
              color="primary"
              tag="span"
              weight="bold"
            >
              Даты
            </Typography.Text>
          </Table.THeadCell>
          <Table.THeadCell className={styles.table__headCell} width={144}>
            <Typography.Text
              view="primary-small"
              color="primary"
              tag="span"
              weight="bold"
            >
              Тип
            </Typography.Text>
          </Table.THeadCell>
          <Table.THeadCell className={styles.table__headCell} width={144}>
            <Typography.Text
              view="primary-small"
              color="primary"
              tag="span"
              weight="bold"
            >
              Значимость
            </Typography.Text>
          </Table.THeadCell>
          <Table.THeadCell className={styles.table__headCell} width={136}>
            <Typography.Text
              view="primary-small"
              color="primary"
              tag="span"
              weight="bold"
            >
              Статус
            </Typography.Text>
          </Table.THeadCell>
        </Table.THead>
        <Table.TBody>
          {tasks.map((task) => (
            <Table.TExpandableRow
              key={task.id}
              renderContent={(expanded) => (
                <Table.TCell colSpan={5}>
                  <Collapse expanded={expanded}>
                    <div className={styles.table__taskExpand}>
                      <div className={styles.table__taskDescription}>
                        <Typography.Text
                          className={styles.table__descriptionHeader}
                          view="primary-small"
                          color="secondary"
                          tag="p"
                        >
                          Описание задачи
                        </Typography.Text>
                        <Typography.Text
                          view="primary-medium"
                          color="primary"
                          tag="p"
                          className={styles.table__descriptionText}
                        >
                          {task.description}
                        </Typography.Text>
                      </div>
                      {role !== 'worker' ? (
                        <ButtonDesktop
                          size="xxs"
                          view="tertiary"
                          className={styles.table__taskButton}
                          onClick={() => handleEditClick(task)}
                        >
                          Редактировать задачу
                        </ButtonDesktop>
                      ) : (
                        renderStatusButton(task)
                      )}
                      <div className={styles.table__taskComments}>
                        <Typography.Text
                          view="primary-large"
                          weight="medium"
                          color="primary"
                          tag="p"
                        >
                          Комментарии к задаче
                        </Typography.Text>
                        <Comments taskId={task.id} />
                      </div>
                    </div>
                  </Collapse>
                </Table.TCell>
              )}
            >
              <Table.TCell className={styles.table__row}>
                <Typography.Text
                  view="primary-medium"
                  color="primary"
                  tag="span"
                >
                  {task.name}
                </Typography.Text>
              </Table.TCell>
              <Table.TCell className={styles.table__row}>
                <Typography.Text
                  view="primary-medium"
                  color="primary"
                  tag="span"
                >
                  {`${formatDate(task.start_time)} - ${formatDate(task.end_time)}`}
                </Typography.Text>
              </Table.TCell>
              <Table.TCell className={styles.table__row}>
                <Typography.Text
                  view="primary-medium"
                  color="primary"
                  tag="span"
                >
                  {task.task_type.name}
                </Typography.Text>
              </Table.TCell>
              <Table.TCell className={styles.table__row}>
                <Typography.Text
                  view="primary-medium"
                  color="primary"
                  tag="span"
                >
                  {task.importance.name}
                </Typography.Text>
              </Table.TCell>
              <Table.TCell className={styles.table__row}>
                <Status
                  className={`${styles.status} ${styles[`status_type_${task.status.slug}`]}`}
                >
                  {task.status.description}
                </Status>
              </Table.TCell>
            </Table.TExpandableRow>
          ))}
        </Table.TBody>
      </Table>
      <AddTaskModal
        modalAnatomy={modalAnatomy}
        handleModalAnatomy={handleModalAnatomy}
        idpId={idpId}
        taskData={taskData}
        edit
      />
    </div>
  );
}
