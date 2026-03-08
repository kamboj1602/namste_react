import ResturantCard from "./ResturantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";


const Body = () => {

    const [listofrestaurants, setlistofrestaurants] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const [SearchText, setSearchText] = useState("");

    useEffect(()  =>{
        fetchData();
    },[] )

    const fetchData = async () => {
        const data = await fetch(
            "https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=30.69936058837141&lng=76.70452357406616&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
        );
        const json = await data.json();
        console.log(json);
        setlistofrestaurants(json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants || []);
        setFilteredRestaurants(json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants || []);
      
    };
    // if  (listofrestaurants.length === 0 ){
    //     return <Shimmer />;
    // }
    return listofrestaurants.length ===0 ? (
         <Shimmer /> 
        ):(
        <div className="body">
            <div className="filter">
                <div className="search">
                    <input type="text" className="search-box" value ={SearchText} onChange={(e) => {
                        setSearchText(e.target.value);
                    }} />
                    <button
                        onClick = {() => {
                            const filteredRestaurants = listofrestaurants.filter((res) =>
                                res.info.name.toLowerCase().includes(SearchText.toLowerCase())
                        );
                        setFilteredRestaurants(filteredRestaurants);
                        }}>
                        Search
                        </button>
                </div>
                <button className="filter-btn" 
                onClick={() => {
                const filteredlist = listofrestaurants.filter(
                    (res) => res.info.avgRating > 4.3
                );
                     setlistofrestaurants(filteredlist);
                    }}
                >
                Top Rated Restaurants
                </button>
            </div>
            <div className="res-container">
                {/* <ResturantCard resName="SrshtiFoodCorner" cuisine="Chole Naan, Tikki, Samosa" rating="4.5 stars" /> */}
                {/* <ResturantCard resName="AbhishekFoodCorner" cuisine="Soya Chap, bhelpuri, dosa" rating="4.4 stars" /> */}
                {filteredRestaurants?.map((restaurant) => (
                    <ResturantCard key={restaurant.info.id} resData={restaurant.info} />
                ))}
            </div>
        </div >
    );
    
};
    export default Body;