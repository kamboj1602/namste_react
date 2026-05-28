import ResturantCard from "./ResturantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";

const FALLBACK_RESTAURANTS = [
  {
    info: {
      id: "421055",
      name: "Domino's Pizza",
      cuisines: ["Pizzas", "Italian", "Pastas", "Desserts"],
      avgRating: 4.5,
      avgRatingString: "4.5",
      cloudinaryImageId:
        "RX_THUMBNAIL/IMAGES/VENDOR/2025/11/11/12048385-0463-4b9a-b8fb-eb8ed8328bad_421055.JPG",
      areaName: "Sector 70",
      locality: "Mohali",
      costForTwo: "₹400 for two",
      totalRatingsString: "3.5K+",
    },
  },
  {
    info: {
      id: "48344",
      name: "KFC",
      cuisines: ["Burgers", "Fast Food", "Rolls & Wraps"],
      avgRating: 4.3,
      avgRatingString: "4.3",
      cloudinaryImageId:
        "RX_THUMBNAIL/IMAGES/VENDOR/2026/1/8/1b57b671-2ee0-4594-9faf-1ddf8fd397ac_48344.JPG",
      areaName: "Phase 3 Mohali",
      locality: "Phase 3",
      costForTwo: "₹500 for two",
      totalRatingsString: "15K+",
    },
  },
  {
    info: {
      id: "772030",
      name: "McDonald's",
      cuisines: ["American", "Fast Food"],
      avgRating: 4.4,
      avgRatingString: "4.4",
      cloudinaryImageId:
        "RX_THUMBNAIL/IMAGES/VENDOR/2025/1/9/4f9bb48e-82df-474b-8d71-cb12703bba30_772030.JPG",
      areaName: "Airport Road",
      locality: "Airport Road",
      costForTwo: "₹400 for two",
      totalRatingsString: "4.7K+",
    },
  },
];

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetch(
        "https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=30.69936058837141&lng=76.70452357406616&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );
      const json = await data.json();
      const restaurants =
        json?.data?.cards
          ?.find(
            (card) =>
              card?.card?.card?.gridElements?.infoWithStyle?.restaurants
          )
          ?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

      if (!restaurants.length) {
        throw new Error("Restaurant data unavailable");
      }

      setListOfRestaurants(restaurants);
      setFilteredRestaurants(restaurants);
    } catch (err) {
      console.error(err);
      setError("Unable to load live restaurant data. Showing sample restaurants.");
      setListOfRestaurants(FALLBACK_RESTAURANTS);
      setFilteredRestaurants(FALLBACK_RESTAURANTS);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    const query = searchText.trim().toLowerCase();
    if (!query) {
      setFilteredRestaurants(listOfRestaurants);
      return;
    }

    const filtered = listOfRestaurants.filter((restaurant) =>
      restaurant?.info?.name?.toLowerCase().includes(query)
    );
    setFilteredRestaurants(filtered);
  };

  const handleTopRated = () => {
    const filtered = listOfRestaurants.filter(
      (restaurant) => Number(restaurant?.info?.avgRating) >= 4.3
    );
    setFilteredRestaurants(filtered);
  };

  const handleReset = () => {
    setSearchText("");
    setFilteredRestaurants(listOfRestaurants);
  };

  if (loading) {
    return <Shimmer />;
  }

  return (
    <div className="body">
      <div className="body-top">
        <div className="search">
          <input
            type="text"
            className="search-box"
            value={searchText}
            placeholder="Search restaurants, cuisine or location"
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <button className="search-btn" onClick={handleSearch}>
            Search
          </button>
        </div>
        <div className="filter-actions">
          <button className="filter-btn" onClick={handleTopRated}>
            Top Rated
          </button>
          <button className="secondary-btn" onClick={handleReset}>
            Clear
          </button>
        </div>
      </div>

      {error && <div className="alert">{error}</div>}

      <div className="res-container">
        {filteredRestaurants.length ? (
          filteredRestaurants.map((restaurant) => (
            <ResturantCard
              key={restaurant.info.id}
              resData={restaurant.info}
            />
          ))
        ) : (
          <div className="no-results">
            No restaurants match your search. Try a different name or clear
            filters.
          </div>
        )}
      </div>
    </div>
  );
};

export default Body;
