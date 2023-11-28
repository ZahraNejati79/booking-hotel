import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";

const BookmarkListContext = createContext();
const BASE_URL = "http://localhost:5000";
const initialState = {
  bookmarks: [],
  isLoading: false,
  currentBookmark: null,
  error: null,
};

function bookmarkReducer(state, { type, payload }) {
  switch (type) {
    case "loading":
      return { ...state, isLoading: true };
    case "bookmarks/loaded":
      return { ...state, isLoading: false, bookmarks: payload };
    case "bookmark/loaded":
      return { ...state, isLoading: false, currentBookmark: payload };
    case "bookmark/created":
      return {
        ...state,
        isLoading: false,
        bookmarks: [...state.bookmarks, payload],
      };
    case "bookmark/deleted":
      return {
        ...state,
        isLoading: false,
        bookmarks: state.bookmarks.filter(
          (bookmark) => bookmark.id !== Number(payload)
        ),
      };
    case "rejected":
      return { ...state, isLoading: false, error: payload };
    default:
      throw new Error("Unknown action");
  }
}

function BookmarkListProviter({ children }) {
  // const [currentBookmark, setCurrentBookmark] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);
  // const [bookmarks, setBookmarks] = useState([]);
  // const [error, setError] = useState(null);
  // const [isLoadingCurrentBookmark, setIsLoadingCurrentBookmark] =
  //   useState(false);

  const [{ bookmarks, isLoading, currentBookmark }, dispatch] = useReducer(
    bookmarkReducer,
    initialState
  );

  useEffect(() => {
    async function fetchBookmarkList() {
      dispatch({ type: "loading" });
      try {
        const { data } = await axios.get(`${BASE_URL}/bookmarks`);
        dispatch({ type: "bookmarks/loaded", payload: data });
      } catch (error) {
        dispatch({
          type: "rejected",
          payload: "an Errror occurred in loading bookmarks",
        });
      }
    }
    fetchBookmarkList();
  }, []);

  async function getCurrentBookmark(id) {
    if (Number(id) === currentBookmark?.id) return;

    dispatch({ type: "loading" });
    try {
      const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);
      dispatch({ type: "bookmark/loaded", payload: data });
    } catch (error) {
      toast.error(error.message);
      dispatch({
        type: "rejected",
        payload: "an Error occurred in fetching single bookmark",
      });
    }
  }

  async function postBookmark(newBookmark) {
    dispatch({ type: "loading" });
    try {
      const { data } = await axios.post(`${BASE_URL}/bookmarks`, newBookmark);
      dispatch({ type: "bookmark/created", payload: data });
    } catch (error) {
      dispatch({ type: "rejected", payload: error.message });
    }
  }

  async function deleteBookmark(id) {
    dispatch({ type: "loading" });
    try {
      await axios.delete(`${BASE_URL}/bookmarks/${id}`);
      dispatch({ type: "bookmark/deleted", payload: id });
    } catch (error) {
      dispatch({ type: "rejected", payload: error.message });
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
