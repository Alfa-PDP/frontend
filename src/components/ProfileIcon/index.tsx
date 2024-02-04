import { useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Circle } from '@alfalab/core-components/icon-view/circle';
import { Popover } from '@alfalab/core-components/popover';
import { RadioGroupDesktop } from '@alfalab/core-components/radio-group/desktop';
import { Tag } from '@alfalab/core-components/tag';
import { AScoresCircleSIcon } from '@alfalab/icons-glyph/AScoresCircleSIcon';

import worker from '../../assets/icons/worker.png';
import leader from '../../assets/icons/leader.png';

import styles from './styles.module.scss';
import {
  LEADER_ID,
  LEADER_TOKEN,
  WORKER_ID,
  WORKER_TOKEN,
} from '../../utils/constants';
import { useActions } from '../../hooks/actions';
import { useAppSelector } from '../../hooks/redux';

export default function ProfileIcon() {
  const [open, setOpen] = useState(false);
  const [buttonElement, setButtonElement] = useState<HTMLElement | null>(null);
  const [value, setValue] = useState('');
  const navigate = useNavigate();

  const { setRole } = useActions();
  const roleSelector = useAppSelector((state) => state.user);

  const changeToWorker = () => {
    localStorage.setItem('role', 'worker');
    localStorage.setItem('token', WORKER_TOKEN);
    localStorage.setItem('user_id', WORKER_ID);
  };

  const changeToLeader = () => {
    localStorage.setItem('role', 'leader');
    localStorage.setItem('token', LEADER_TOKEN);
    localStorage.setItem('user_id', LEADER_ID);
  };

  useLayoutEffect(() => {
    const role = localStorage.getItem('role');
    if (!role) {
      changeToWorker();
      setValue('worker');
    } else {
      setValue(role);
    }
    setRole({ role: role as 'worker' | 'leader' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = () => {
    setOpen(!open);
  };
  const handleRef = (node: HTMLElement | null) => {
    setButtonElement(node);
  };

  const switchRole = () => {
    if (value === 'worker') {
      changeToLeader();
    } else {
      changeToWorker();
    }
  };

  const onChange = (
    _event: React.MouseEvent<Element, MouseEvent> | React.ChangeEvent<Element>,
    payload: { value: string; name?: string | undefined }
  ) => {
    setValue(payload.value);
    setRole({ role: payload.value });
    switchRole();
    toggle();
    navigate('/');
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
          imageUrl={roleSelector.role === 'leader' ? leader : worker}
          bottomAddons={
            <AScoresCircleSIcon
              color={roleSelector.role === 'leader' ? '#ef3124' : '#0CC44D'}
            />
          }
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
