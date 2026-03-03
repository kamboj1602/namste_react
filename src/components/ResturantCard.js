import {CDN_URL } from "../utils/constants"
const ResturantCard = ({ resData }) => {
    const { name, cuisines,avgRatingString, id, cloudinaryImageId, locality,areaName } = resData;
    return (
        <div className="res-card" style={{ backgroundColor: "#f0f0f0" }}>
            <img className="res-logo"
                alt="res-logo"
                src={CDN_URL+cloudinaryImageId}
            />
            <h3>{name}</h3>
            <h4>{cuisines}</h4>
            <h4>{avgRatingString}</h4>
            <h4>{areaName}</h4>
        </div>
    );
};

export default ResturantCard;