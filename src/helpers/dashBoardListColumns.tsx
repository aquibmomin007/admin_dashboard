import 'antd/dist/antd.css';
import { ColumnType } from 'antd/lib/table';

export type dashBoardListColumnsProps = {
  id: string;
  name: string;
  price: number;
  type: string;
  category: string;
  unit: number;
  language: string;
  description: string;
  key: number;
};

type ColumnName = keyof dashBoardListColumnsProps;

type TableColumnMeta = {
  name: ColumnName;
  label: string;
  type: string;
};

export const tableColumns: TableColumnMeta[] = [
  { name: 'name', label: 'Name', type: 'string' },
  { name: 'price', label: 'Price', type: 'number' },
  { name: 'unit', label: 'Unit', type: 'number' },
  { name: 'type', label: 'Type', type: 'string' },
  { name: 'category', label: 'Category', type: 'string' },
  { name: 'language', label: 'Language', type: 'string' },
  { name: 'description', label: 'Description', type: 'string' },
];

export const dashBoardListColumns: ColumnType<dashBoardListColumnsProps>[] = [
  ...tableColumns.map((column) => ({
    title: column.label,
    dataIndex: column.name,
    key: column.name,
    sorter: (
      a: dashBoardListColumnsProps,
      b: dashBoardListColumnsProps
    ): number => {
      if (
        typeof a[column.name] === 'number' &&
        typeof b[column.name] === 'number'
      ) {
        return Number(a[column.name]) - Number(b[column.name]);
      }
      return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
    },
  })),
];
