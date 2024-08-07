import React from "react";
import "../../../src/App.css";

function Catagories() {
  const categoryItems = [
    {
      id: 1,
      title: "Burgers",
      despriction: "(20+ Dishes)",
      image: "/home/catagories/img1.png",
    },
    {
      id: 2,
      title: "Pizza",
      despriction: "(12 Dishes)",
      image: "/images/recipes/BBQ Chicken Pizza.jpg",
    },
    {
      id: 4,
      title: "Browse All",
      despriction: "(50 Items)",
      image: "/images/recipes/Cappuccino.png",
    },
  ];

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 py-16">
      <div className="text-center">
        <p className="subtitle">Customer Favorites</p>
        <h2 className="title">Popular Catagories</h2>
      </div>

      {/* category cards */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-2 justify-around items-center mt-12 z-20">
        {categoryItems.map((item, i) => (
          <div
            key={i}
            className="shadow-lg rounded-md bg-white py-6 px-5 w-72 mx-auto text-center cursor-pointer hover:-translate-y-4 transition-all duration-300 "
          >
            <div className="w-full mx-auto flex items-center justify-center z-50">
              <img
                src={item.image}
                alt=""
                className="bg-[#C1F1C6] p-5 rounded-full w-28 h-28 "
              />
            </div>
            <div className="mt-5 space-y-1">
              <h5 className="text-[#1E1E1E] font-semibold">{item.title}</h5>
              <p className="text-secondary text-sm">{item.despriction}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Catagories;
