import { useParams } from "react-router-dom";
import { useBookmarks } from "../context/BookmarkListProvider";
import Loader from "../Loader/Loader";
import ReactCountryFlag from "react-country-flag";
import { useEffect } from "react";

const SingleBookmark = () => {
  const { id } = useParams();
  const { isLoadingCurrentBookmark, currentBookmark, getCurrentBookmark } =
    useBookmarks();

  useEffect(() => {
    getCurrentBookmark(id);
    console.log("id:", id);
  }, [id]);

  if (isLoadingCurrentBookmark || !currentBookmark) return <Loader />;
  return (
    <div className="roomDetail">
      <h2>{currentBookmark.cityName}</h2>
      <div className="bookmarkItem">
        <ReactCountryFlag svg countryCode={currentBookmark.countryCode} />
        &nbsp; <strong>{currentBookmark.cityName}</strong> &nbsp;
        <span>{currentBookmark.country}</span>
      </div>
    </div>
  );
};

export default SingleBookmark;
