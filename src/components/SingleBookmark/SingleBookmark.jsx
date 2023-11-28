import { useNavigate, useParams } from "react-router-dom";
import { useBookmarks } from "../context/BookmarkListProvider";
import Loader from "../Loader/Loader";
import ReactCountryFlag from "react-country-flag";
import { useEffect } from "react";

const SingleBookmark = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoading, currentBookmark, getCurrentBookmark } = useBookmarks();

  useEffect(() => {
    getCurrentBookmark(id);
  }, [id]);

  console.log(id);
  console.log(isLoading);
  console.log(currentBookmark);

  if (isLoading || !currentBookmark) return <Loader />;
  return (
    <div className="currentBookmark">
      <button onClick={() => navigate(-1)} className="btn btn--back">
        &larr; Back
      </button>
      <h2>{currentBookmark.cityName}</h2>
      <div className={`bookmarkItem`}>
        <ReactCountryFlag svg countryCode={currentBookmark.countryCode} />
        &nbsp; <strong>{currentBookmark.cityName}</strong> &nbsp;
        <span>{currentBookmark.country}</span>
      </div>
    </div>
  );
};

export default SingleBookmark;
