import { ModalDesktop } from '@alfalab/core-components/modal/desktop';
import { Input } from '@alfalab/core-components/input';
import { CalendarRange } from '@alfalab/core-components/calendar-range';
import { Typography } from '@alfalab/core-components/typography';
import { SelectDesktop } from '@alfalab/core-components/select/desktop';
import { Button } from '@alfalab/core-components/button';
import styles from './styles.module.scss';

interface Props {
  modalAnatomy: boolean;
  handleModalAnatomy: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function AddTaskModal({
  modalAnatomy,
  handleModalAnatomy,
}: Props) {
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
        onClose={() => handleModalAnatomy(false)}
        size="m"
      >
        <ModalDesktop.Header>Новая задача</ModalDesktop.Header>
        <ModalDesktop.Content className={styles.addTask__content}>
          <Input
            block
            placeholder="Можно в двух словах"
            label="Название задачи"
            size="s"
            labelView="outer"
          />
          <Input
            block
            placeholder="Опишите критерии выполнения задачи подробнее, это поможет вашему сотруднику"
            label="Описание задачи"
            size="s"
            labelView="outer"
          />
          <div className={styles.addTask__calendarContainer}>
            <Typography.Text
              view="secondary-large"
              color="secondary"
              className={styles.addTask__calendarLabel}
            >
              Даты выполнения
            </Typography.Text>
            <CalendarRange calendarPosition="popover" />
          </div>
          <div className={styles.addTask__selectContainer}>
            <SelectDesktop
              allowUnselect
              size="s"
              options={TYPES}
              placeholder="Выберите"
              label="Выберите тип"
              labelView="outer"
              block
            />
            <SelectDesktop
              allowUnselect
              size="s"
              options={LEVELS}
              placeholder="Выберите"
              label="Выберите значимость"
              labelView="outer"
              block
            />
            <SelectDesktop
              allowUnselect
              size="s"
              options={STATUSES}
              placeholder="Выберите"
              label="Статус"
              labelView="outer"
              block
            />
          </div>
          <Button
            disabled
            view="primary"
            type="button"
            size="m"
            className={styles.addTask__saveButton}
          >
            Сохранить
          </Button>
        </ModalDesktop.Content>
      </ModalDesktop>
    </section>
  );
}
