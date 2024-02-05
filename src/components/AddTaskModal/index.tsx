// import * as yup from 'yup';

import { ModalDesktop } from '@alfalab/core-components/modal/desktop';
import { Input } from '@alfalab/core-components/input';
import { CalendarRange } from '@alfalab/core-components/calendar-range';
import { Typography } from '@alfalab/core-components/typography';
import { SelectDesktop } from '@alfalab/core-components/select/desktop';
import { Button } from '@alfalab/core-components/button';
import { Textarea } from '@alfalab/core-components/textarea';

import styles from './styles.module.scss';
import { usePostTaskMutation } from '../../store/alfa/alfa.api';

interface Props {
  modalAnatomy: boolean;
  handleModalAnatomy: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddTaskModal({
  modalAnatomy,
  handleModalAnatomy,
}: Props) {
  const [postTask] = usePostTaskMutation();
  console.log(postTask);

  // const schema = yup.object().shape({
  //   taskName: yup.string().required('Название задачи обязательно'),
  //   description: yup.string().required('Описание обязательно'),
  //   startTime: yup.date().required('Необходимо указать дату начала'),
  //   endTime: yup.date().required('Необходимо указать дату окончания'),
  //   taskType: yup.string().required('Тип задачи обязателен'),
  //   importance: yup.string().required('Уровень важности обязателен'),
  //   statusId: yup.string().required('Статус задачи обязателен'),
  // });

  // const [taskName, setTaskName] = useState('');
  // const [description, setDescription] = useState('');
  // const [startTime, setStartTime] = useState('');
  // const [endTime, setEndTime] = useState('');
  // const [taskType, setTaskType] = useState('');
  // const [importance, setImportance] = useState('');
  // const [statusId, setStatusId] = useState('');

  const TYPES = [
    { key: '1', content: 'Hard skills' },
    { key: '2', content: 'Soft skills' },
    { key: '3', content: 'Обучение' },
  ];
  const LEVELS = [
    { key: '1', content: 'Низкая' },
    { key: '2', content: 'Средняя' },
    { key: '3', content: 'Высокая' },
  ];
  const STATUSES = [
    { key: '1', content: 'Новая' },
    { key: '2', content: 'В работе' },
    { key: '3', content: 'Выполнена' },
    { key: '4', content: 'Не выполнена' },
    { key: '5', content: 'Отменена' },
  ];

  return (
    <section className={styles.addTask}>
      <ModalDesktop
        open={modalAnatomy}
        onClose={() => {
          handleModalAnatomy(false);
        }}
        size="m"
      >
        <ModalDesktop.Header>Новая задача</ModalDesktop.Header>
        <ModalDesktop.Content className={styles.addTask__content}>
          <form className={styles.addTask__form}>
            <Input
              block
              placeholder="Можно в двух словах"
              label="Название задачи"
              size="m"
              labelView="outer"
            />
            <Textarea
              block
              labelView="outer"
              minRows={3}
              placeholder="Опишите критерии выполнения задачи подробнее, это поможет вашему сотруднику"
              label="Описание задачи"
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
                calendarPosition="popover"
                // onDateFromChange={(payload) => setStartTime(payload.value)}
                // onDateToChange={(payload) => setEndTime(payload.value)}
              />
            </div>
            <div className={styles.addTask__selectContainer}>
              <SelectDesktop
                allowUnselect
                size="m"
                options={TYPES}
                placeholder="Выберите"
                label="Выберите тип"
                labelView="outer"
                // onChange={async (payload) => {
                //   await setValue('taskType', payload.selected.key);
                //   trigger('taskType');
                // }}
                block
              />
              <SelectDesktop
                allowUnselect
                size="m"
                options={LEVELS}
                placeholder="Выберите"
                label="Выберите значимость"
                labelView="outer"
                // onChange={async (payload) => {
                //   await setValue('importance', payload.selected.key);
                //   trigger('importance');
                // }}
                block
              />
              <SelectDesktop
                allowUnselect
                size="m"
                options={STATUSES}
                placeholder="Выберите"
                label="Статус"
                labelView="outer"
                // onChange={async (payload) => {
                //   console.log(payload);
                //   await setValue('statusId', payload.selected?.key);
                //   trigger('statusId');
                // }}
                block
              />
            </div>
            <Button
              view="primary"
              type="submit"
              size="s"
              className={styles.addTask__saveButton}
            >
              Сохранить
            </Button>
          </form>
        </ModalDesktop.Content>
      </ModalDesktop>
    </section>
  );
}
