import { Table } from '@alfalab/core-components/table';
import { Collapse } from '@alfalab/core-components/collapse';
import { Status } from '@alfalab/core-components/status';
import { Typography } from '@alfalab/core-components/typography';
import { ButtonDesktop } from '@alfalab/core-components/button/desktop';
import styles from './styles.module.scss';
import Comments from '../Comments';
import { formatDate } from '../../utils/formatDate';
import { UserTask } from '../../store/alfa/types';

interface Props {
  tasks: UserTask[];
  role: boolean;
}

export default function TaskTable({ tasks, role }: Props) {
  console.log(tasks);
  return (
    <div style={{ width: '100%' }}>
      <Table wrapper={false}>
        <Table.THead>
          <Table.THeadCell className={styles.table__headCell}>
            <Typography.Text
              view="primary-small"
              color="primary"
              tag="span"
              weight="bold"
            >
              Задача (3)
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
                      {role ? (
                        <ButtonDesktop
                          size="xxs"
                          view="tertiary"
                          className={styles.table__taskButton}
                        >
                          Редактировать задачу
                        </ButtonDesktop>
                      ) : (
                        <ButtonDesktop
                          size="xxs"
                          view="primary"
                          className={styles.table__taskButton}
                        >
                          Взять в работу
                        </ButtonDesktop>
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
                        <Comments comments={task.comments} />
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
                  {task.task_type}
                </Typography.Text>
              </Table.TCell>
              <Table.TCell className={styles.table__row}>
                <Typography.Text
                  view="primary-medium"
                  color="primary"
                  tag="span"
                >
                  {task.importance}
                </Typography.Text>
              </Table.TCell>
              <Table.TCell>
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
    </div>
  );
}
