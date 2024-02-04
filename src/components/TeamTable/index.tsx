/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { Table } from '@alfalab/core-components/table';
import { Typography } from '@alfalab/core-components/typography';
import { Circle } from '@alfalab/core-components/icon-view/circle';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';

import {
  useGetWorkersQuery,
  useLazyGetWorkersQuery,
} from '../../store/alfa/alfa.api';
import { CURRENT_YEAR, TEAM_ID } from '../../utils/constants';
import { useAppSelector } from '../../hooks/redux';
import { WorkersList } from '../../store/alfa/types';

export default function TeamTable() {
  const [sortKey, setSortKey] = useState<string | undefined>(undefined);
  const [isSortedDesc, setIsSortedDesc] = useState<boolean | undefined>(
    undefined
  );

  const [dataForRender, setDataForRender] = useState<WorkersList>([]);
  const navigate = useNavigate();

  const navigateToProgress = (id: string) => {
    navigate(`/progress/${id}/`, { replace: false });
  };

  const { filteredYear = CURRENT_YEAR } = useAppSelector(
    (state) => state.filteredYear
  );

  const { data: initialData } = useGetWorkersQuery({
    team_id: TEAM_ID,
    year: filteredYear,
  });

  useEffect(() => {
    if (initialData) {
      setDataForRender(initialData);
    }
  }, [initialData]);

  const [triggerSort] = useLazyGetWorkersQuery();

  const handleSort = (key: string) => {
    if (key === sortKey) {
      setIsSortedDesc((prev) => !prev);
    } else {
      setIsSortedDesc(false);
    }
    setSortKey(key);
    triggerSort({
      team_id: TEAM_ID,
      year: filteredYear,
      sort_by: key,
      order: isSortedDesc ? 'desc' : 'asc',
    }).then((res) => {
      if (res.data) {
        setDataForRender(res.data);
      }
    });
  };

  return (
    <Table wrapper={false}>
      <Table.THead>
        <Table.TSortableHeadCell
          title="Сотрудник"
          isSortedDesc={sortKey === 'family_name' ? isSortedDesc : undefined}
          onSort={() => handleSort('family_name')}
          className={styles.table__headCell}
        >
          Сотрудник
        </Table.TSortableHeadCell>

        <Table.TSortableHeadCell
          title="Задачи"
          isSortedDesc={sortKey === 'task_count' ? isSortedDesc : undefined}
          onSort={() => {
            handleSort('task_count');
          }}
          className={styles.table__headCell}
        >
          Задачи
        </Table.TSortableHeadCell>

        <Table.TSortableHeadCell
          title="ПРОГРЕСС"
          isSortedDesc={sortKey === 'task_progress' ? isSortedDesc : undefined}
          onSort={() => {
            handleSort('task_progress');
          }}
          width={190}
          className={styles.table__headCell}
        >
          ПРОГРЕСС
        </Table.TSortableHeadCell>
      </Table.THead>
      <Table.TBody>
        {dataForRender?.map((row) => (
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
