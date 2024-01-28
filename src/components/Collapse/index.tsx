import { Typography } from '@alfalab/core-components/typography';
import { useState, useRef, useEffect } from 'react';
import styles from './styles.module.scss';

interface TextAttributesProps {
  textAttributes: string;
  attributeName: string;
}

export default function Collapse({
  textAttributes,
  attributeName,
}: TextAttributesProps) {
  const [stateButtonMore, setStateButtonMore] = useState(false); // Состояние кнопки "Подробнее", если true - textarea открыта, если false - закрыта.
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [disabledTextarea, setDisabledTextarea] = useState(true); // Состояние кнопки "Редактировать", если true - textarea открыта и редактируется, если false - закрыта.
  const [textareaValue, setTextareaValue] = useState(false);
  const employee = true; // Роль руководитель/сотрудник
  const [textareaHeight, setTextareaHeight] = useState<number>(88);
  const [textAttributesValue, setTextAttributesValue] =
    useState(textAttributes);

  // Определяем, сколько строк в textarea для отключения кнопки "Подробнее"
  useEffect(() => {
    if (textareaRef.current) {
      const lineHeight = parseFloat(
        window.getComputedStyle(textareaRef.current).lineHeight || '0'
      );
      const paddingTop = parseFloat(
        window.getComputedStyle(textareaRef.current).paddingTop || '0'
      );
      const paddingBottom = parseFloat(
        window.getComputedStyle(textareaRef.current).paddingBottom || '0'
      );
      const totalPadding = paddingTop + paddingBottom;
      const lines = Math.ceil(
        (textareaRef.current.scrollHeight - totalPadding) / lineHeight
      );
      if (lines > 4) {
        setTextareaValue(true);
      } else {
        setTextareaValue(false);
      }
      setTextareaHeight(textareaRef.current.scrollHeight);
    }
  }, [textAttributes]);

  // Изменение размера textarea в зависимости от состояния кнопки "Подробнее"
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight - 10}px`;
    }
  }, [stateButtonMore]);

  // Изменение состояния кнопки "Подробнее"
  const handlerButton = () => {
    setStateButtonMore(!stateButtonMore);
  };

  // Изменение состояния кнопки "Редактировать" и изменение активности textarea
  const onClickEdit = () => {
    setStateButtonMore(!stateButtonMore);
    setDisabledTextarea(!disabledTextarea);
  };

  // высота div'a в зависимости от textarea
  let styleContainer = {};

  if (
    !textareaValue &&
    textareaRef.current &&
    textAttributes &&
    disabledTextarea
  ) {
    styleContainer = { maxHeight: `${textareaHeight + 45}px` };
  } else if (stateButtonMore && textareaRef.current) {
    styleContainer = { maxHeight: `${textareaHeight + 75}px` };
  } else {
    styleContainer = {};
  }

  return (
    <div
      className={`${styles.professionalAttributes} ${!textAttributes ? styles.professionalAttributes_void : styles.professionalAttributes_full} ${stateButtonMore ? styles.professionalAttributes_open : ''}`}
      style={styleContainer}
    >
      {employee && (
        <button
          className={styles.professionalAttributes__edit}
          type="button"
          aria-label="Редактировать"
          onClick={onClickEdit}
        />
      )}
      <Typography.Text
        weight="bold"
        className={styles.professionalAttributes__title}
      >
        {attributeName}
      </Typography.Text>
      <textarea
        ref={textareaRef}
        className={styles.professionalAttributes__textarea}
        disabled={disabledTextarea}
        value={textAttributesValue}
        placeholder="Не заполнено"
        onChange={(e) => setTextAttributesValue(e.target.value)}
        style={{
          border: disabledTextarea ? 'none' : '1px solid #E7E8EB',
          backgroundColor: disabledTextarea ? '#fff' : '#F3F4F6',
        }}
      />
      {textareaValue && (
        <button
          className={styles.professionalAttributes__button}
          type="button"
          onClick={handlerButton}
        >
          <span className={styles.professionalAttributes__textButton}>
            {!stateButtonMore ? 'Подробнее' : 'Скрыть'}
          </span>
        </button>
      )}
    </div>
  );
}
