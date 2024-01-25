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
];
export default function TaskTable() {
  return (
    <Table wrapper={false}>
      <Table.THead>
        <Table.THeadCell className={styles.table__headCell}>
          Задача (3)
        </Table.THeadCell>
        <Table.THeadCell className={styles.table__headCell}>
          Даты
        </Table.THeadCell>
        <Table.THeadCell className={styles.table__headCell}>
          Тип
        </Table.THeadCell>
        <Table.THeadCell className={styles.table__headCell}>
          Значимость
        </Table.THeadCell>
        <Table.THeadCell className={styles.table__headCell}>
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
                  <h1 style={{ height: '100px' }}>TEST</h1>
                </Collapse>
              </Table.TCell>
            )}
          >
            <Table.TCell className={styles.table__row}>{row.task}</Table.TCell>
            <Table.TCell className={styles.table__row}>{row.date}</Table.TCell>
            <Table.TCell className={styles.table__row}>{row.type}</Table.TCell>
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
                  В работе
                </Status>
              )}
            </Table.TCell>
          </Table.TExpandableRow>
        ))}
      </Table.TBody>
    </Table>
  );
}
