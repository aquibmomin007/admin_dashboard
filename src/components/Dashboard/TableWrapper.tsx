import React, { useState, useCallback, ReactText } from 'react';
import { Table, Modal, notification, Space, Button, Input } from 'antd';
import { dashBoardListColumnsProps, tableColumns, TableColumnMeta } from '../../helpers/dashBoardListColumns';
import { deleteBook } from '../../helpers/api';
import { ExclamationCircleOutlined, SearchOutlined } from '@ant-design/icons';
import BookModalWrapper from '../BookModalWrapper/BookModalWrapper';
import { ColumnType } from 'antd/lib/table';
import Highlighter from 'react-highlight-words';
import { FilterDropdownProps } from 'antd/lib/table/interface';

export type TableWrapperProps = {
    dataSource: dashBoardListColumnsProps[]
    onActionSuccess: () => void
}

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

const sorterFn = (column: TableColumnMeta) => (
  a: dashBoardListColumnsProps,
  b: dashBoardListColumnsProps
): number => {
  if (
    typeof a[column.name] === 'number' &&
    typeof b[column.name] === 'number'
  ) {
    return Number(a[column.name]) - Number(b[column.name]);
  }
  
  const first = a[column.name] as string
  const second = b[column.name] as string
  
  return first.toLowerCase().localeCompare(second.toLowerCase());
}

export const TableWrapper: React.FC<TableWrapperProps> = ({ dataSource, onActionSuccess }) => {
  const [searchedColumn, setSearchedColumn] = useState('')
  const [searchedText, setSearchedText] = useState<ReactText>('')

  let inputRef = React.useRef<Input>(null);

  const handleSearch = (selectedKeys: ReactText[], confirm: Function, dataIndex: string) => {
    confirm();
    setSearchedText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }

  const handleReset = (clearFilters?: Function) => {
    clearFilters && clearFilters();
    setSearchedText('')
  }

  const getColumnSearchProps = (dataIndex: string) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: FilterDropdownProps) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={inputRef}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value: any, record: any) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    render: (text: any) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchedText as string]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const dashBoardListColumns: ColumnType<dashBoardListColumnsProps>[] = [
    ...tableColumns.map((column) => ({
      title: column.label,
      dataIndex: column.name,
      key: column.name,
      sorter: sorterFn(column),
      ...getColumnSearchProps(column.name),
    })),
    {
      title: 'Actions',
      key: 'actions',
      render: renderActions(onActionSuccess),
    }
  ]

  return (
    <Table dataSource={dataSource} columns={dashBoardListColumns} />
  )
}

export default TableWrapper;