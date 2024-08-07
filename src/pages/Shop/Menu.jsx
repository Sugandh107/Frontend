import React, { useEffect, useState } from "react";
import Player from "react-lottie-player";
import Cards from "../../components/Cards";
import { FaSearch } from "react-icons/fa";
import loadingAnimation from '../../../public/animation.json'; // adjust the path as needed


function Menu() {
  const [menu, setMenu] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); // Number of items to display per page
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://backend-2bj9.onrender.com//menu");
        const data = await response.json();
        console.log(data);
        setMenu(data);
        setFilteredItems(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchData();
  }, []);

  const filterItems = (category) => {
    const filtered =
      category === "all"
        ? menu
        : menu.filter((item) => item.category === category);

    setFilteredItems(filtered);
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const showAll = () => {
    setFilteredItems(menu);
    setSelectedCategory("all");
    setCurrentPage(1);
  };

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    if (term) {
      const filtered = menu.filter((item) =>
        item.name.toLowerCase().includes(term)
      );
      setFilteredItems(filtered);
    } else {
      setFilteredItems(menu);
    }
    setCurrentPage(1);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  // Log currentItems to check for duplicates
  console.log('Current Items:', currentItems);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div>
        <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
          <div className="py-24 flex flex-col items-center justify-center">
            {/* content */}
            <div className="text-center px-4 space-y-7">
              <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
                For the Love of Delicious <span className="text-yellow-300">Food</span>
              </h2>
            </div>
          </div>
        </div>

        {/* menu shop */}
        <div className="section-container">
          <div className="flex flex-col md:flex-row flex-wrap md:justify-between items-center space-y-3 mb-8">
            {/* all category buttons */}
            <div className="flex flex-row justify-start md:items-center md:gap-8 gap-4 flex-wrap">
              <button
                onClick={showAll}
                className={selectedCategory === "all" ? "active" : ""}
              >
                All
              </button>
              <button
                onClick={() => filterItems("pizza")}
                className={selectedCategory === "pizza" ? "active" : ""}
              >
                Pizza
              </button>
              <button
                onClick={() => filterItems("Burger")}
                className={selectedCategory === "Burger" ? "active" : ""}
              >
                Burger
              </button>
              <button
                onClick={() => filterItems("drinks")}
                className={selectedCategory === "drinks" ? "active" : ""}
              >
                Drinks
              </button>
            </div>

            {/* filter options */}
            <div className="flex justify-end mb-4 rounded-sm">
              <div className="flex items-center border-b border-gray-300 py-2">
                <FaSearch className="text-gray-500 mr-2" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Loading Animation */}
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Player
                autoplay
                loop
                src={loadingAnimation}
                style={{ height: '300px', width: '300px' }}
              />
            </div>
          ) : (
            <>
              {/* product card */}
              <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
                {currentItems.map((item) => (
                  <Cards key={item._id} item={item} />
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center my-8">
                {Array.from({
                  length: Math.ceil(filteredItems.length / itemsPerPage),
                }).map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => paginate(index + 1)}
                    className={`mx-1 px-3 py-1 rounded-full ${
                      currentPage === index + 1 ? "bg-red text-white" : "bg-gray-200"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}



export default Menu;
