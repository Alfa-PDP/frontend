import { Modal } from '@alfalab/core-components/modal';
import { Typography } from '@alfalab/core-components/typography';
import { Button } from '@alfalab/core-components/button';
import styles from './styles.module.scss';

interface ModalCloseProps {
  modalTitle: string;
  modalSubtitle: string;
  modalButton: string;
  modalButtonCancel: string;
  stateModalClose: boolean;
  closeModalButton: () => void;
  cancelEditButton: () => void;
}

export default function ModalClose({
  modalTitle,
  modalSubtitle,
  modalButton,
  modalButtonCancel,
  stateModalClose,
  closeModalButton,
  cancelEditButton,
}: ModalCloseProps) {
  return (
    <Modal open={stateModalClose} size="s">
      <Modal.Header hasCloser={false} contentClassName={styles.modalClose}>
        <Typography.Title tag="h3">{modalTitle}</Typography.Title>
      </Modal.Header>
      <Modal.Content>
        <Typography.Text color="static-tertiary-dark">
          {modalSubtitle}
        </Typography.Text>
      </Modal.Content>
      <Modal.Footer>
        <Button view="primary" block onClick={cancelEditButton}>
          {modalButton}
        </Button>
        <Button view="tertiary" block onClick={closeModalButton}>
          {modalButtonCancel}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
