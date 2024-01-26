import { Table } from '@alfalab/core-components/table';
import { Collapse } from '@alfalab/core-components/collapse';
import { Status } from '@alfalab/core-components/status';
import styles from './styles.module.scss';

const data = [
  {
    id: 1,
    task: 'Принять участие в проекте в роли тимлида',
    date: '01.02.2024 - 12.04.2024',
    type: 'Hard skills',
    significance: 'Низкая',
    status: 'inWork',
  },
  {
    id: 2,
    task: 'Принять участие в проекте в роли тимлида',
    date: '01.02.2024 - 12.04.2024',
    type: 'Hard skills',
    significance: 'Низкая',
    status: 'completed',
  },
  {
    id: 3,
    task: 'Принять участие в проекте в роли тимлида',
    date: '01.02.2024 - 12.04.2024',
    type: 'Hard skills',
    significance: 'Низкая',
    status: 'new',
  },
];
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
                    <h1 style={{ height: '100px' }}>{row.id}</h1>
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
                {row.status === 'inWork' && (
                  <Status
                    className={`${styles.status} ${styles.status_type_inWork}`}
                  >
                    В работе
                  </Status>
                )}
                {row.status === 'completed' && (
                  <Status
                    className={`${styles.status} ${styles.status_type_completed}`}
                  >
                    Выполнена
                  </Status>
                )}
                {row.status === 'new' && (
                  <Status
                    className={`${styles.status} ${styles.status_type_new}`}
                  >
                    Новая
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
