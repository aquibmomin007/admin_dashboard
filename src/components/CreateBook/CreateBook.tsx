import React, { useCallback, useState } from 'react';
import styles from './CreateBook.module.scss'
import { Button } from 'antd';
import BookModalWrapper from '../BookModalWrapper/BookModalWrapper';

type CreateBookProps = {
  onSuccess: () => void
}

const CreateBook = ({ onSuccess }: CreateBookProps) => { 
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);

  const openCreateModal = useCallback(() => setShowCreateModal(true), [setShowCreateModal])
  const closeCreateModal = useCallback(() => setShowCreateModal(false), [setShowCreateModal])

  return (
    <div className={styles.DashBoardCreateaBlock}>
      <Button type="primary" onClick={openCreateModal}>Create</Button>
      <BookModalWrapper initialValues={{}} visible={showCreateModal} onSuccess={onSuccess} onClose={closeCreateModal} mode="create" />
    </div>
  )
}

export default CreateBook;