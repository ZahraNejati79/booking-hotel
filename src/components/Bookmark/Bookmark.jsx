import ReactCountryFlag from "react-country-flag";
import { useBookmarks } from "../context/BookmarkListProvider";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";

const Bookmark = () => {
  const { isLoading, bookmarks, currentBookmark } = useBookmarks();
  if (isLoading) return <Loader />;
  return (
    <div>
      <h2>BookmarkList</h2>
      <div className="bookmarkList">
        {bookmarks.map((item) => (
          <Link
            key={item.id}
            to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
          >
            <div
              className={`bookmarkItem ${
                item.id === currentBookmark?.id && "current-bookmark"
              }`}
            >
              <ReactCountryFlag svg countryCode={item.countryCode} />
              &nbsp; <strong>{item.cityName}</strong> &nbsp;{" "}
              <span>{item.country}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Bookmark;
