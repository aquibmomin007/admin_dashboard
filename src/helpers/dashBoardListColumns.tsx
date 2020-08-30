import 'antd/dist/antd.css'

export type dashBoardListColumnsProps = {
  id: string
  name: string
  price: number
  type: string
  category: string
  unit: number
  language: string
  description: string
  key: number
}

type ColumnName = keyof dashBoardListColumnsProps

export type TableColumnMeta = {
  name: ColumnName
  label: string
  type: string
}

export const tableColumns: TableColumnMeta[] = [
  { name: 'name', label: 'Name', type: 'string' },
  { name: 'price', label: 'Price', type: 'number' },
  { name: 'unit', label: 'Unit', type: 'number' },
  { name: 'type', label: 'Type', type: 'string' },
  { name: 'category', label: 'Category', type: 'string' },
  { name: 'language', label: 'Language', type: 'string' },
  { name: 'description', label: 'Description', type: 'string' },
]
