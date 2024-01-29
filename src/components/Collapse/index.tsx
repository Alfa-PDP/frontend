import { Typography } from '@alfalab/core-components/typography';
import { IconButton } from '@alfalab/core-components/icon-button';
import { Textarea } from '@alfalab/core-components/textarea';
import { Button } from '@alfalab/core-components/button';
import { useEffect, useRef, useState } from 'react';
import editIcon from '../../assets/icons/editButton.svg';
import styles from './styles.module.scss';

interface TextAttributesProps {
  textAttributes: string;
  attributeName: string;
}

export default function Collapse({
  textAttributes,
  attributeName,
}: TextAttributesProps) {
  // Позволяет получить ссылку на textarea
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  // Позволяет получить высоту textarea
  const [lineHeight, setLineHeight] = useState(0);
  // Позволяет открыть/закрыть textarea для возможности редактирования
  const [stateTextarea, setStateTextarea] = useState(true);
  // Позволяет открыть/закрыть кнопку "Подробнее" и весь скрытый контент
  const [moreButton, setMoreButton] = useState(false);
  // Позволяет отслеживать изменения value textarea
  const [textAttributesValue, setTextAttributesValue] =
    useState(textAttributes);
  // Позволяет установить значение атрибута maxRows у textarea
  const [stateRows, setStateRows] = useState(3);

  // Позволяет установить актуальное значение maxRows для textarea. setTimeout нужен для того, чтобы свойство transition завершилось без визуальных артефактов
  function handlerStateRows() {
    if (moreButton) {
      setTimeout(() => {
        setStateRows(3);
      }, 200);
    } else {
      setStateRows(999);
    }
  }

  // Позволяет получить высоту textarea для аккуратного редактиирования текста, чтобы при изменении value textarea пересчитывалась высота
  useEffect(() => {
    if (textareaRef.current) {
      setLineHeight(textareaRef.current.scrollHeight);
    }
  }, [textAttributesValue]);

  // Позволяет открыть/закрыть кнопку "Подробнее"/"Скрыть". handlerStateRows() позволяет автоматически открыть весь скрытый контент при нажатии на кнопку редактирования.
  const handlerToggleMoreButton = () => {
    setMoreButton(!moreButton);
    handlerStateRows();
  };

  // Позволяет открыть/закрыть textarea для возможности редактирования
  const handlerEditTextarea = () => {
    handlerStateRows();
    setMoreButton(true);
    setStateTextarea(!stateTextarea);
  };

  // Позволяет отслеживать изменения value textarea
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextAttributesValue(event.target.value);
  };

  return (
    <div
      className={styles.professionalAttributes}
      style={
        !moreButton
          ? { maxHeight: `138px` }
          : { maxHeight: `${lineHeight + 90}px` }
      }
    >
      <IconButton
        icon={<img src={editIcon} alt="Edit" />}
        onClick={handlerEditTextarea}
        className={styles.professionalAttributes__edit}
      />
      <Typography.Text
        weight="bold"
        className={styles.professionalAttributes__title}
      >
        {attributeName}
      </Typography.Text>
      <Textarea
        className={`${styles.professionalAttributes__textarea} ${!stateTextarea && styles.professionalAttributes__textarea_active}`}
        fieldClassName={`${styles.professionalAttributes__textarea} ${!stateTextarea && styles.professionalAttributes__textarea_activeFieldClassName}`}
        textareaClassName={`${styles.professionalAttributes__textarea} ${!stateTextarea && styles.professionalAttributes__textarea_activeTextareaClassName}`}
        ref={textareaRef}
        value={textAttributesValue}
        onChange={handleChange}
        placeholder="Не заполнено"
        autosize
        maxRows={stateRows}
        minRows={1}
        readOnly={stateTextarea}
      />
      {lineHeight > 70 && (
        <Button
          className={styles.professionalAttributes__button}
          type="button"
          view="ghost"
          size="s"
          onClick={handlerToggleMoreButton}
        >
          {!moreButton ? 'Подробнее' : 'Скрыть'}
        </Button>
      )}
    </div>
  );
}
