import { createContext, useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const BookmarkListContext = createContext();
const BASE_URL = "http://localhost:5000";

function BookmarkListProviter({ children }) {
  const [currentBookmark, setCurrentBookmark] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const [error, setError] = useState(null);
  const [isLoadingCurrentBookmark, setIsLoadingCurrentBookmark] =
    useState(false);

  useEffect(() => {
    async function fetchBookmarkList() {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`${BASE_URL}/bookmarks`);
        setBookmarks(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchBookmarkList();
  }, []);

  async function getCurrentBookmark(id) {
    setIsLoadingCurrentBookmark(true);
    try {
      const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);
      setCurrentBookmark(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoadingCurrentBookmark(false);
    }
  }

  async function postBookmark(newBookmark) {
    setIsLoading(true);
    try {
      const { data } = await axios.post(`${BASE_URL}/bookmarks`, newBookmark);
      setBookmarks((prev) => [...prev, data]);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteBookmark(id) {
    setIsLoading(true);
    try {
      await axios.delete(`${BASE_URL}/bookmarks/${id}`);
      setBookmarks((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <BookmarkListContext.Provider
      value={{
        bookmarks,
        currentBookmark,
        isLoading,
        getCurrentBookmark,
        postBookmark,
        isLoadingCurrentBookmark,
        deleteBookmark,
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
