import { Table } from '@alfalab/core-components/table';
import { Collapse } from '@alfalab/core-components/collapse';
import { Status } from '@alfalab/core-components/status';
import { Typography } from '@alfalab/core-components/typography';
import { ButtonDesktop } from '@alfalab/core-components/button/desktop';
import styles from './styles.module.scss';
import Comments from '../Comments';
import { TaskData } from '../../types/Task';
import { StatusMap } from '../../types/Status';

const data: TaskData[] = [
  {
    id: 1,
    task: 'Принять участие в проекте в роли тимлида',
    date: '01.02.2024 - 12.04.2024',
    type: 'Hard skills',
    significance: 'Низкая',
    status: 'inWork',
    description:
      'Прокачать навык публичного выступления выступив спикером на любом публичном мероприятии по своему выбору (конференция, семинар, митап и т.д.). Не менее 3 мероприятий. По завершению задачи пришли записи своих выступлений, чтобы я мог дать тебе фидбэк. ',
    comments: [
      {
        id: 1,
        author: 'Алабамов Сергей Викторович',
        time: '25 янв, 11:13',
        text: 'Принято. Отчет об успешном обучении на курсе в мом мент анализа целей позволит отметить задачу выполненной.',
      },
      {
        id: 2,
        author: 'Алабамов Сергей Викторович',
        time: '25 янв, 11:14',
        text: 'Принято. Отчет об успешном обучении на курсе в мом мент анализа целей позволит отметить задачу выполненной.',
      },
    ],
  },
  {
    id: 2,
    task: 'Принять участие в проекте в роли тимлида',
    date: '01.02.2024 - 12.04.2024',
    type: 'Hard skills',
    significance: 'Низкая',
    status: 'completed',
    description:
      'Прокачать навык публичного выступления выступив спикером на любом публичном мероприятии по своему выбору (конференция, семинар, митап и т.д.). Не менее 3 мероприятий. По завершению задачи пришли записи своих выступлений, чтобы я мог дать тебе фидбэк. ',
    comments: [
      {
        id: 1,
        author: 'Алабамов Сергей Викторович',
        time: '25 янв, 11:13',
        text: 'Принято. Отчет об успешном обучении на курсе в мом мент анализа целей позволит отметить задачу выполненной.',
      },
    ],
  },
  {
    id: 3,
    task: 'Принять участие в проекте в роли тимлида',
    date: '01.02.2024 - 12.04.2024',
    type: 'Hard skills',
    significance: 'Низкая',
    status: 'new',
    description:
      'Прокачать навык публичного выступления выступив спикером на любом публичном мероприятии по своему выбору (конференция, семинар, митап и т.д.). Не менее 3 мероприятий. По завершению задачи пришли записи своих выступлений, чтобы я мог дать тебе фидбэк. ',
    comments: [
      {
        id: 1,
        author: 'Алабамов Сергей Викторович',
        time: '25 янв, 11:13',
        text: 'Принято. Отчет об успешном обучении на курсе в мом мент анализа целей позволит отметить задачу выполненной.',
      },
      {
        id: 2,
        author: 'Вы',
        time: '24 янв, 11:13',
        text: 'Прохожу обучение на платформе Стратоплан. Обучение выходит за рамки оговороенного срока, поскольку начинается во втором квартале 2024 г.',
      },
    ],
  },
];

const statusMap: StatusMap = {
  inWork: {
    text: 'В работе',
    className: styles.status_type_inWork,
  },
  completed: {
    text: 'Выполнена',
    className: styles.status_type_completed,
  },
  new: {
    text: 'Новая',
    className: styles.status_type_new,
  },
  notComplited: {
    text: 'Не выполнена',
    className: styles.status_type_notComplited,
  },
  canceled: {
    text: 'Отменена',
    className: styles.status_type_canceled,
  },
};
export default function TaskTable() {
  return (
    <div style={{ width: '100%' }}>
      <Table wrapper={false}>
        <Table.THead>
          <Table.THeadCell className={styles.table__headCell}>
            Задача (3)
          </Table.THeadCell>
          <Table.THeadCell className={styles.table__headCell} width={190}>
            Даты
          </Table.THeadCell>
          <Table.THeadCell className={styles.table__headCell} width={144}>
            Тип
          </Table.THeadCell>
          <Table.THeadCell className={styles.table__headCell} width={144}>
            Значимость
          </Table.THeadCell>
          <Table.THeadCell className={styles.table__headCell} width={136}>
            Статус
          </Table.THeadCell>
        </Table.THead>
        <Table.TBody>
          {data.map((row) => (
            <Table.TExpandableRow
              key={row.id}
              renderContent={(expanded) => (
                <Table.TCell colSpan={5}>
                  <Collapse expanded={expanded}>
                    <div className={styles.table__taskExpand}>
                      <div className={styles.table__taskDescription}>
                        <Typography.Text
                          view="secondary-medium"
                          color="secondary"
                          tag="p"
                          style={{ marginBottom: '4px' }}
                        >
                          Описание задачи
                        </Typography.Text>
                        <Typography.Text
                          view="primary-medium"
                          color="primary"
                          tag="p"
                        >
                          {row.description}
                        </Typography.Text>
                      </div>
                      <ButtonDesktop
                        size="xxs"
                        view="primary"
                        className={styles.table__taskButton}
                      >
                        Взять в работу
                      </ButtonDesktop>
                      <Typography.Text
                        view="primary-large"
                        weight="medium"
                        color="primary"
                        tag="p"
                      >
                        Комментарии к задаче
                      </Typography.Text>
                      <Comments comments={row.comments} />
                    </div>
                  </Collapse>
                </Table.TCell>
              )}
            >
              <Table.TCell className={styles.table__row}>
                {row.task}
              </Table.TCell>
              <Table.TCell className={styles.table__row}>
                {row.date}
              </Table.TCell>
              <Table.TCell className={styles.table__row}>
                {row.type}
              </Table.TCell>
              <Table.TCell className={styles.table__row}>
                {row.significance}
              </Table.TCell>
              <Table.TCell>
                {statusMap[row.status] && (
                  <Status
                    className={`${styles.status} ${statusMap[row.status].className}`}
                  >
                    {statusMap[row.status].text}
                  </Status>
                )}
              </Table.TCell>
            </Table.TExpandableRow>
          ))}
        </Table.TBody>
      </Table>
    </div>
  );
}
