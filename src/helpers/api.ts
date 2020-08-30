import axiosInstance from './axiosInstance';
import { dashBoardListColumnsProps } from './dashBoardListColumns';

type bookListResponse = {
  [key: string]: dashBoardListColumnsProps;
};

const formatList = (data: bookListResponse): dashBoardListColumnsProps[] => {
  const keys = Object.keys(data);
  const result: dashBoardListColumnsProps[] = [];

  keys.forEach((key, i) => {
    if (data[key]) {
      result.push({ ...data[key], id: key, key: i });
    }
  });

  return result.reverse();
};

type bookListResult = {
  data: dashBoardListColumnsProps[];
  error?: Error;
};

export const fetchBookList = async (): Promise<bookListResult> => {
  const response: bookListResult = { data: [] };

  try {
    const result = await axiosInstance.get('/bookList.json');
    response.data = formatList(result.data);
  } catch (err) {
    response.error = err;
  }

  return response;
};

export const deleteBook = (bookId: string): Promise<bookListResponse> =>
  axiosInstance.delete(`/bookList/${bookId}.json`);

export const addNewBook = (
  newBook: dashBoardListColumnsProps
): Promise<bookListResponse> => axiosInstance.post('/bookList.json', newBook);

export const updateBook = (
  updatedBook: dashBoardListColumnsProps
): Promise<null> =>
  axiosInstance.patch('/bookList.json', {
    [updatedBook.id]: updatedBook,
  });
