import React, { useState, useCallback, useEffect } from 'react';
import styles from './DashBoard.module.scss'
import { dashBoardListColumns, dashBoardListColumnsProps } from '../../helpers/dashBoardListColumns'
import { Table, Space, Button, Modal, notification } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { fetchBookList, deleteBook } from '../../helpers/api';
import CreateBook from '../CreateBook/CreateBook';
import BookModalWrapper from '../BookModalWrapper/BookModalWrapper';

export type ModalMode = 'edit' | 'create';

const confirmDeletion = (dataSource: dashBoardListColumnsProps, callback: Function) => Modal.confirm({
  title: 'Confirm',
  icon: <ExclamationCircleOutlined />,
  content: 'Do you want to delete this book record?',
  okText: 'Confirm',
  cancelText: 'Cancel',
  onOk: () => {
    deleteBook(dataSource.id).then(() => {
      notification.info({
        message: 'Notification',
        description: `${dataSource.name} was deleted successfully`,
        placement: 'topLeft',
        duration: 3,
      });
      callback()
    })
  },
})

const renderActions = (callback: () => void) => (dataSource: dashBoardListColumnsProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const openModal = useCallback(() => setShowModal(true), [setShowModal])
  const closeModal = useCallback(() => setShowModal(false), [setShowModal])

  return (
    <Space>
      <Button type="primary" onClick={openModal}>Edit</Button>
      <Button type="primary" onClick={() => confirmDeletion(dataSource, callback)}>Delete</Button>
      <BookModalWrapper initialValues={dataSource} visible={showModal} onClose={closeModal} onSuccess={callback} mode="edit" />
    </Space>
  )
}

const getColumnsWithAction = (callback: () => void) => dashBoardListColumns.concat({
  title: 'Actions',
  key: 'actions',
  render: renderActions(callback),
})

const DashBoard = () => {
  const [bookList, setBookList] = useState<dashBoardListColumnsProps[]>([])

  const refreshResults = useCallback(() => {
    fetchBookList().then(({ data }) => setBookList(data))
  }, [])

  useEffect(refreshResults, [])

  return (
    <div className={styles.DashBoardWrapper} >
        <CreateBook onSuccess={refreshResults} />
        <Table dataSource={bookList} columns={getColumnsWithAction(refreshResults)} />
    </div>
  )
}

export default DashBoard;