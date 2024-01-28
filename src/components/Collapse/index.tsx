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
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [lineHeight, setLineHeight] = useState(0);
  const [stateTextarea, setStateTextarea] = useState(true);
  const [moreButton, setMoreButton] = useState(false);
  const [textAttributesValue, setTextAttributesValue] =
    useState(textAttributes);

  useEffect(() => {
    if (textareaRef.current) {
      setLineHeight(textareaRef.current.scrollHeight);
    }
  }, [textAttributesValue]);

  const handlerToggleMoreButton = () => {
    setMoreButton(!moreButton);
  };

  const handlerEditTextarea = () => {
    setMoreButton(true);
    setStateTextarea(!stateTextarea);
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextAttributesValue(event.target.value);
  };

  return (
    <div className={styles.professionalAttributes}>
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
        className={styles.professionalAttributes__textarea}
        fieldClassName={styles.professionalAttributes__textarea}
        textareaClassName={styles.professionalAttributes__textarea}
        ref={textareaRef}
        value={textAttributesValue}
        onChange={handleChange}
        placeholder="Не заполнено"
        autosize
        maxRows={moreButton ? 999 : 3}
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
