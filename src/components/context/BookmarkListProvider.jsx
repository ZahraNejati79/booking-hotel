import { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const BookmarkListContext = createContext();
const BASE_URL = "http://localhost:5000";

function BookmarkListProviter({ children }) {
  const [currentBookmark, setCurrentBookmark] = useState({});
  const [isLoadingBookmark, setIsLoadingBookmark] = useState(false);

  const { isLoading, data: bookmarks } = useFetch(`${BASE_URL}/bookmarks`);

  async function getCurrentBookmark(id) {
    setIsLoadingBookmark(true);
    try {
      const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);
      setCurrentBookmark(data);
      setIsLoadingBookmark(false);
    } catch (error) {
      console.log(error.message);
      setIsLoadingBookmark(false);
    }
  }

  return (
    <BookmarkListContext.Provider
      value={{
        isLoading,
        bookmarks,
        currentBookmark,
        isLoadingBookmark,
        getCurrentBookmark,
      }}
    >
      {children}
    </BookmarkListContext.Provider>
  );
}
export default BookmarkListProviter;

export function useBookmarks() {
  return useContext(BookmarkListContext);
}
