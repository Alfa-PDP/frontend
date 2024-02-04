import { Notification } from '@alfalab/core-components/notification';

import { useAppSelector } from '../../hooks/redux';
import { useActions } from '../../hooks/actions';

export default function InfoMessage() {
  const infoMessage = useAppSelector((state) => state.infoMessage);

  const visibleAction = useActions();

  return (
    <Notification
      title={infoMessage.title}
      badge={infoMessage.badge}
      visible={infoMessage.visible}
      hasCloser={false}
      autoCloseDelay={3000}
      onCloseTimeout={() => visibleAction.setVisibleFalse()}
    />
  );
}
