import { CDN_URL } from "../utils/constants";

const ResturantCard = ({ resData }) => {
  const {
    name,
    cuisines,
    avgRatingString,
    avgRating,
    cloudinaryImageId,
    locality,
    areaName,
    costForTwo,
    totalRatingsString,
  } = resData;

  const cuisineText = Array.isArray(cuisines) ? cuisines.join(", ") : cuisines;

  return (
    <article className="res-card">
      <img
        className="res-logo"
        alt={name || "Restaurant"}
        src={
          cloudinaryImageId
            ? CDN_URL + cloudinaryImageId
            : "https://via.placeholder.com/400x300?text=Restaurant"
        }
      />
      <div className="res-content">
        <h3>{name}</h3>
        <p className="res-meta">{cuisineText}</p>
        <div className="res-stats">
          <span className="rating">
            ⭐ {avgRatingString || avgRating || "N/A"}
          </span>
          <span className="area">{areaName || locality}</span>
        </div>
        <p className="res-subtitle">
          {costForTwo || ""}
          {totalRatingsString ? ` · ${totalRatingsString}` : ""}
        </p>
      </div>
    </article>
  );
};

export default ResturantCard;
