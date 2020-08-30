import React, { useState, useCallback, useEffect } from 'react';
import { dashBoardListColumnsProps } from '../../helpers/dashBoardListColumns'
import { fetchBookList } from '../../helpers/api';
import CreateBook from '../CreateBook/CreateBook';
import TableWrapper from './TableWrapper';

export type ModalMode = 'edit' | 'create';

const Dashboard = () => {
  const [bookList, setBookList] = useState<dashBoardListColumnsProps[]>([])

  const refreshResults = useCallback(() => {
    fetchBookList().then(({ data }) => setBookList(data))
  }, [])

  useEffect(refreshResults, [])

  return (
    <div>
        <CreateBook onSuccess={refreshResults} />
        <TableWrapper dataSource={bookList} onActionSuccess={refreshResults} />
    </div>
  )
}

export default Dashboard;