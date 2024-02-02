import { useLayoutEffect, useState } from 'react';
import { Circle } from '@alfalab/core-components/icon-view/circle';
import { Popover } from '@alfalab/core-components/popover';
import { RadioGroupDesktop } from '@alfalab/core-components/radio-group/desktop';
import { Tag } from '@alfalab/core-components/tag';
import SelectionMaskMIcon from '@alfalab/icons-glyph/SelectionMaskMIcon';
import cat from '../../assets/icons/cat.png';
import styles from './styles.module.scss';
import {
  LEADER_ID,
  LEADER_TOKEN,
  WORKER_ID,
  WORKER_TOKEN,
} from '../../utils/constants';

export default function ProfileIcon() {
  const [open, setOpen] = useState(false);
  const [buttonElement, setButtonElement] = useState<HTMLElement | null>(null);
  const [value, setValue] = useState('');

  useLayoutEffect(() => {
    const role = localStorage.getItem('role');
    if (!role) {
      setValue('worker');
      localStorage.setItem('role', 'worker');
      localStorage.setItem('token', WORKER_TOKEN);
    } else {
      setValue(role);
    }
  }, []);

  const toggle = () => {
    setOpen(!open);
  };
  const handleRef = (node: HTMLElement | null) => {
    setButtonElement(node);
  };

  const switchRole = () => {
    if (value === 'worker') {
      setValue('leader');
      localStorage.setItem('token', LEADER_TOKEN);
      localStorage.setItem('role', 'leader');
      localStorage.setItem('user_id', LEADER_ID);
    } else {
      setValue('worker');
      localStorage.setItem('token', WORKER_TOKEN);
      localStorage.setItem('role', 'worker');
      localStorage.setItem('user_id', WORKER_ID);
    }
  };

  const onChange = (
    _event: React.MouseEvent<Element, MouseEvent> | React.ChangeEvent<Element>,
    payload: { value: string; name?: string | undefined }
  ) => {
    setValue(payload.value);
    switchRole();
    toggle();
  };

  return (
    <>
      <button
        type="button"
        aria-label="change-role"
        className={styles.profileButton}
        onClick={toggle}
        ref={handleRef}
      >
        <Circle
          size={48}
          imageUrl={cat}
          bottomAddons={<SelectionMaskMIcon color="#0CC44D" />}
        />
      </button>
      <Popover
        anchorElement={buttonElement}
        open={open}
        transition={{ timeout: 150 }}
        withTransition
        position="bottom"
        popperClassName={styles.profileButton__popover}
      >
        <RadioGroupDesktop
          label="Выберите роль"
          onChange={onChange}
          direction="horizontal"
          type="tag"
          value={value}
          name="change-role"
        >
          <Tag value="leader">Руководитель</Tag>
          <Tag value="worker">Сотрудник</Tag>
        </RadioGroupDesktop>
      </Popover>
    </>
  );
}
