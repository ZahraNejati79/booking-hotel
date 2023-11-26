import { Outlet } from "react-router-dom";
import Map from "../Map/Map";
import { useBookmarks } from "../context/BookmarkListProvider";
import Loader from "../Loader/Loader";
const BookmarkLayout = () => {
  const { bookmarks, isLoading } = useBookmarks();
  if (isLoading) return <Loader />;
  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />
      </div>
      <Map markerLocations={bookmarks} />
    </div>
  );
};

export default BookmarkLayout;
