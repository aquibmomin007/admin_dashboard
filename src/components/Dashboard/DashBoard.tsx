import React, { useState, useCallback, useEffect } from 'react';
import styles from './DashBoard.module.scss'
import { dashBoardListColumnsProps } from '../../helpers/dashBoardListColumns'
import { fetchBookList } from '../../helpers/api';
import CreateBook from '../CreateBook/CreateBook';
import TableWrapper from './TableWrapper';

export type ModalMode = 'edit' | 'create';

const DashBoard = () => {
  const [bookList, setBookList] = useState<dashBoardListColumnsProps[]>([])

  const refreshResults = useCallback(() => {
    fetchBookList().then(({ data }) => setBookList(data))
  }, [])

  useEffect(refreshResults, [])

  return (
    <div className={styles.DashBoardWrapper} >
        <CreateBook onSuccess={refreshResults} />
        <TableWrapper dataSource={bookList} onActionSuccess={refreshResults} />
    </div>
  )
}

export default DashBoard;