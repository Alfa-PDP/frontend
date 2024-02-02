/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Table } from '@alfalab/core-components/table';
import { Typography } from '@alfalab/core-components/typography';
import { Circle } from '@alfalab/core-components/icon-view/circle';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';
// import cat from '../../assets/icons/cat.png';
import { useGetWorkersQuery } from '../../store/alfa/alfa.api';
import { TEAM_ID } from '../../utils/constants';

// const data = [
//   {
//     id: 1,
//     name: 'Констанинопольский Константин Константинович',
//     position: 'Менеджер',
//     tasks: 3,
//     progress: 55,
//     img: cat,
//   },
//   {
//     id: 2,
//     name: 'Никитина Анастасия Андреевна',
//     position: 'Начальник отдела',
//     tasks: 5,
//     progress: 0,
//     img: cat,
//   },
//   {
//     id: 3,
//     name: 'Засланский Аслан Бараевич',
//     position: 'Начальник отдела разработки',
//     tasks: 1,
//     progress: 99,
//     img: cat,
//   },
//   {
//     id: 4,
//     name: 'Мандрыкин Павел Эдуардович',
//     position: 'Журналист',
//     tasks: 7,
//     progress: 100,
//     img: '',
//   },
// ];

export default function TeamTable() {
  const [sortKey, setSortKey] = useState(undefined);
  const [isSortedDesc, setIsSortedDesc] = useState(undefined);
  const navigate = useNavigate();

  const navigateToProgress = (id: string) => {
    navigate(`/progress/${id}/`, { replace: false });
  };

  // const {getList, { data }} = useGetWorkersQuery({
  //   team_id: TEAM_ID,
  // });

  const { data } = useGetWorkersQuery({
    team_id: TEAM_ID,
  });

  console.log(setSortKey);
  console.log(setIsSortedDesc);

  return (
    <Table wrapper={false}>
      <Table.THead>
        <Table.TSortableHeadCell
          title="Сотрудник"
          isSortedDesc={sortKey === 'worker' ? isSortedDesc : undefined}
          onSort={() => {}}
          className={styles.table__headCell}
        >
          Сотрудник
        </Table.TSortableHeadCell>

        <Table.TSortableHeadCell
          title="Задачи"
          isSortedDesc={sortKey === 'tasks' ? isSortedDesc : undefined}
          onSort={() => {}}
          className={styles.table__headCell}
        >
          Задачи
        </Table.TSortableHeadCell>

        <Table.TSortableHeadCell
          title="ПРОГРЕСС"
          isSortedDesc={sortKey === 'progress' ? isSortedDesc : undefined}
          onSort={() => {}}
          width={190}
          className={styles.table__headCell}
        >
          ПРОГРЕСС
        </Table.TSortableHeadCell>
      </Table.THead>
      <Table.TBody>
        {data?.map((row) => (
          <Table.TRow key={row.id} onClick={() => navigateToProgress(row.id)}>
            <Table.TCell>
              <div className={styles.table__workerInfoContainer}>
                <Circle imageUrl={row.avatar} size={48} border />
                <div>
                  <Typography.Text view="primary-medium" tag="div">
                    {row.name} {row.middle_name} {row.family_name}
                  </Typography.Text>
                  <Typography.Text view="secondary-medium" color="secondary">
                    {row.position}
                  </Typography.Text>
                </div>
              </div>
            </Table.TCell>

            <Table.TCell className={styles.table__row}>
              <Typography.Text view="primary-medium" tag="div">
                {row.task_count}
              </Typography.Text>
            </Table.TCell>

            <Table.TCell className={styles.table__row}>
              <Typography.Text view="primary-medium" tag="div">
                {row.task_progress}%
              </Typography.Text>
            </Table.TCell>
          </Table.TRow>
        ))}
      </Table.TBody>
    </Table>
  );
}
