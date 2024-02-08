import { ModalDesktop } from '@alfalab/core-components/modal/desktop';
import { Input } from '@alfalab/core-components/input';
import { CalendarRange } from '@alfalab/core-components/calendar-range';
import { Typography } from '@alfalab/core-components/typography';
import { Select } from '@alfalab/core-components/select';
import { Button } from '@alfalab/core-components/button';
import { Textarea } from '@alfalab/core-components/textarea';
import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import {
  useGetTaskStatusesQuery,
  usePostTaskMutation,
  useGetTaskImportanceQuery,
  useGetTaskTypesQuery,
  useDeleteTaskMutation,
  usePatchTaskMutation,
} from '../../store/alfa/alfa.api';
import { STATUS_NEW } from '../../utils/constants';
import { UserTask } from '../../store/alfa/types';
import { useActions } from '../../hooks/actions';

interface Props {
  modalAnatomy: boolean;
  handleModalAnatomy: React.Dispatch<React.SetStateAction<boolean>>;
  idpId: string | unknown;
  edit: boolean;
  // eslint-disable-next-line react/require-default-props
  taskData?: UserTask | undefined;
}

export default function AddTaskModal({
  modalAnatomy,
  handleModalAnatomy,
  idpId,
  edit,
  taskData,
}: Props) {
  const [postTask] = usePostTaskMutation();
  const [patchTask] = usePatchTaskMutation();
  const { data: taskStatuses } = useGetTaskStatusesQuery();
  const { data: taskImportance } = useGetTaskImportanceQuery();
  const { data: taskTypes } = useGetTaskTypesQuery();
  const [deleteTask] = useDeleteTaskMutation();

  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [taskType, setTaskType] = useState('');
  const [importance, setImportance] = useState('');
  const [statusId, setStatusId] = useState('');

  const { setInfoMessage } = useActions();

  function formatTimeForServer(dateString: string) {
    const [day, month, year] = dateString.split('.');
    return `${year}-${month}-${day}`;
  }

  function formatTimeForInput(dateString: string) {
    const [year, month, day] = dateString.split('-');
    return `${day}.${month}.${year}`;
  }

  useEffect(() => {
    if (taskData) {
      setTaskName(taskData.name);
      setDescription(taskData.description);
      setTaskType(taskData.task_type.id);
      setImportance(taskData.importance.id);
      setStatusId(taskData.status.id);
      setStartTime(formatTimeForInput(taskData.start_time));
      setEndTime(formatTimeForInput(taskData.end_time));
    }
  }, [taskData, modalAnatomy]);

  const TYPES = taskTypes?.map((item) => ({
    key: item.id,
    content: item.name,
  }));

  const LEVELS = taskImportance?.map((item) => ({
    key: item.id,
    content: item.name,
  }));

  const STATUSES = taskStatuses?.map((item) => ({
    key: item.id,
    content: item.description,
    slug: item.slug,
    weight: item.weight,
  }));

  function statusHandler(editable: boolean) {
    return editable ? statusId : STATUS_NEW;
  }

  const formData = {
    name: taskName,
    description,
    start_time: formatTimeForServer(startTime),
    end_time: formatTimeForServer(endTime),
    task_type_id: taskType,
    importance_id: importance,
    status_id: statusHandler(edit),
    idp_id: idpId,
  };

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!edit)
      postTask(formData)
        .unwrap()
        .then(() => {
          setInfoMessage({
            title: 'Задача добавлена',
            visible: true,
            badge: 'positive',
          });
        })
        .catch(() => {
          setInfoMessage({
            title: `Задача не добавлена `,
            visible: true,
            badge: 'negative',
          });
        });
    else {
      patchTask({ task_id: taskData?.id ?? '', data: formData })
        .unwrap()
        .then(() => {
          setInfoMessage({
            title: 'Задача обновлена',
            visible: true,
            badge: 'positive',
          });
        })
        .catch(() => {
          setInfoMessage({
            title: `Задача не обновлена `,
            visible: true,
            badge: 'negative',
          });
        });
    }
    handleModalAnatomy(false);
  }

  function handleDelete(taskId: string) {
    deleteTask({ task_id: taskId })
      .unwrap()
      .then(() => {
        setInfoMessage({
          title: 'Задача удалена',
          visible: true,
          badge: 'positive',
        });
      })
      .catch(() => {
        setInfoMessage({
          title: 'Задача не удалена',
          visible: true,
          badge: 'negative',
        });
      })
      .finally(() => {
        handleModalAnatomy(false);
      });
  }

  return (
    <section className={styles.addTask}>
      <ModalDesktop
        open={modalAnatomy}
        onClose={() => {
          handleModalAnatomy(false);
          setTaskName('');
          setDescription('');
          setStartTime('');
          setEndTime('');
          setTaskType('');
          setImportance('');
          setStatusId('');
        }}
        size="m"
      >
        <ModalDesktop.Header>
          {edit ? 'Редактировать задачу' : 'Новая задача'}
        </ModalDesktop.Header>
        <ModalDesktop.Content className={styles.addTask__content}>
          <form onSubmit={handleSubmit} className={styles.addTask__form}>
            <Input
              block
              placeholder="Можно в двух словах"
              label="Название задачи"
              size="s"
              labelView="outer"
              value={taskName}
              minLength={2}
              onChange={(e) => setTaskName(e.target.value)}
            />
            <Textarea
              block
              labelView="outer"
              minRows={3}
              placeholder="Опишите критерии выполнения задачи подробнее, это поможет вашему сотруднику"
              label="Описание задачи"
              minLength={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className={styles.addTask__calendarContainer}>
              <Typography.Text
                view="secondary-large"
                color="secondary"
                className={styles.addTask__calendarLabel}
              >
                Даты выполнения
              </Typography.Text>
              <CalendarRange
                valueFrom={startTime}
                valueTo={endTime}
                calendarPosition="popover"
                onDateFromChange={(payload) => {
                  setStartTime(payload.value);
                }}
                onDateToChange={(payload) => setEndTime(payload.value)}
              />
            </div>
            <div className={styles.addTask__selectContainer}>
              <Select
                allowUnselect
                selected={TYPES?.find((type) => type.key === taskType)}
                size="s"
                options={TYPES || []}
                placeholder="Выберите"
                label="Выберите тип"
                labelView="outer"
                block
                onChange={(payload) => {
                  if (payload.selected) {
                    setTaskType(payload.selected.key);
                  } else {
                    setTaskType('');
                  }
                }}
              />
              <Select
                allowUnselect
                selected={LEVELS?.find((level) => level.key === importance)}
                size="s"
                options={LEVELS || []}
                placeholder="Выберите"
                label="Выберите значимость"
                labelView="outer"
                block
                onChange={(payload) => {
                  if (payload.selected) {
                    setImportance(payload.selected.key);
                  } else {
                    setImportance('');
                  }
                }}
              />
              {edit && (
                <Select
                  allowUnselect
                  selected={STATUSES?.find((status) => status.key === statusId)}
                  size="s"
                  options={STATUSES || []}
                  placeholder="Выберите"
                  label="Статус"
                  labelView="outer"
                  block
                  onChange={(payload) => {
                    const newStatusId = payload.selected
                      ? payload.selected.key
                      : '';
                    setStatusId(newStatusId);
                  }}
                />
              )}
            </div>
            <div style={{ display: 'flex', gap: 20, marginTop: 36 }}>
              <Button view="primary" type="submit" size="m">
                Сохранить
              </Button>

              {edit && (
                <Button
                  view="tertiary"
                  type="button"
                  size="m"
                  onClick={() => handleDelete(taskData?.id || '')}
                >
                  Удалить задачу
                </Button>
              )}
            </div>
          </form>
        </ModalDesktop.Content>
      </ModalDesktop>
    </section>
  );
}
