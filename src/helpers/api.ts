import axiosInstance from "./axiosInstance";
import { dashBoardListColumnsProps } from "./dashBoardListColumns";

const formatList = (data: any): dashBoardListColumnsProps[] => {
  const keys = Object.keys(data)
  const result: dashBoardListColumnsProps[] = []
  
  keys.forEach((key, i) => {
    if (data[key]) {
      result.push({...data[key], id: key, key: i})
    }
  })

  return result.reverse()
}

const formatUpdatedObj = (data: dashBoardListColumnsProps) => {
  console.log(data)
  const result = {
    [data['id']]: data
  }

  return result
}

export const fetchBookList = async () => { 
  let data: dashBoardListColumnsProps[] = [];
  let error: Error | undefined;

  try {
    const result = await axiosInstance.get('/bookList.json');
    data = formatList(result.data)
  } catch (err) {
    error = err
  }

  return { data, error }
};

export const deleteBook = (bookId: string) =>
  axiosInstance.delete('/bookList/' + bookId + '.json')

export const addNewBook = (newBook: dashBoardListColumnsProps) => 
  axiosInstance.post('/bookList.json', newBook)

export const updateBook = (updatedBook: dashBoardListColumnsProps) => 
  axiosInstance.patch('/bookList.json', formatUpdatedObj(updatedBook))
