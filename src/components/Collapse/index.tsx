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
  }, []);

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
        ref={textareaRef}
        block
        value={textAttributesValue}
        onChange={handleChange}
        style={{
          backgroundColor: '#FFF',
          fontSize: '14px',
          overflow: 'hidden',
        }}
        placeholder="Не заполнено"
        autosize
        maxRows={moreButton ? 999 : 3}
        disabled={stateTextarea}
      />
      {lineHeight > 60 && (
        <Button
          className={styles.professionalAttributes__button}
          type="button"
          view="ghost"
          size="s"
          onClick={handlerToggleMoreButton}
        >
          Подробнее
        </Button>
      )}
    </div>
  );
}
