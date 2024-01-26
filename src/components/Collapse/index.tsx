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
  const employee = false; // Роль руководитель/сотрудник

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
    }
  }, [textAttributes]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight - 10}px`;
    }
  }, [stateButtonMore]);

  const handlerButton = () => {
    setStateButtonMore(!stateButtonMore);
  };

  const onClickEdit = () => {
    setStateButtonMore(!stateButtonMore);
    setDisabledTextarea(!disabledTextarea);
  };

  return (
    <div
      className={`${styles.professionalAttributes} ${!textAttributes && styles.professionalAttributes_void} ${stateButtonMore && styles.professionalAttributes_open}`}
      style={
        stateButtonMore && textareaRef.current
          ? { maxHeight: `${textareaRef.current.scrollHeight + 75}px` }
          : {}
      }
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
        value={textAttributes}
        placeholder="Не заполнено"
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
