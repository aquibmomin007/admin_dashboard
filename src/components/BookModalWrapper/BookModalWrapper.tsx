import React, { useCallback } from 'react';
import styles from './BookModalWrapper.module.scss'
import { dashBoardListColumnsProps } from '../../helpers/dashBoardListColumns';
import { updateBook, addNewBook } from '../../helpers/api'
import { ModalContent } from '../ModalContent/ModalContent';
import { ModalMode } from '../BookListing/BookListing';
import Modal from 'antd/lib/modal/Modal';

type BookModalWrapperProps = {
  visible: boolean
  onClose: () => void
  onSuccess: () => void
  mode: ModalMode
  initialValues: { [key: string] : string | number }
}

const BookModalWrapper = ({ initialValues, onClose, onSuccess, mode, visible }: BookModalWrapperProps) => {
  const onFinish = useCallback((values: dashBoardListColumnsProps) => {
    if (mode === 'edit') {
      updateBook({...values, id: initialValues.id as string}).then(() => {
        onSuccess()
        onClose()
      })
    } else {
      addNewBook(values).then(() => {
        onSuccess()
        onClose()
      })
    }
  }, [onClose, initialValues.id, mode, onSuccess]);

  return (
    <div className={styles.DashBoardCreateaBlock}>
      <Modal
        title={`${mode.toUpperCase()} New Book`}
        visible={visible}
        onCancel={onClose}
        footer={null}
      >
        <ModalContent initialValues={initialValues} mode={mode} onConfirm={onFinish}/>
      </Modal>
    </div>
  )
}

export default BookModalWrapper;