"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const subSections = {
  Tech: {
    Apple: ["iPhone", "MacBook", "iPad"],
    Audio: ["Headphones", "Speakers", "Earbuds"],
    Cameras: ["DSLR", "Mirrorless", "Action Cameras"],
    Computers: ["Laptops", "Desktops", "Tablets"],
    Smartphones: ["Android", "iOS", "Windows Phone"],
    TVs: ["LG", "Samsung", "Sony", "Projectors"],
  },
  Fashion: {
    "Men's Fashion Advice": ["Formal", "Casual", "Business Casual"],
    "Men's Fashion Trends": ["Seasonal Trends", "Streetwear", "Minimalist"],
    "Men's Fragrances": ["Cologne", "Perfume", "Body Spray"],
    "Men's Hairstyles": ["Short", "Medium", "Long"],
    "Sneakers & Shoes": ["Sneakers", "Dress Shoes", "Boots"],
    Watches: ["Analog", "Digital", "Smartwatches"],
  },
  Rides: {
    Boats: ["Yachts", "Superyachts", "Sailing", "Jetskis", "Submarines"],
    Cars: [
      "Most Popular Car Brands",
      "Electric Vehicles",
      "SUVs",
      "Porsche",
      "Ford",
      "BMW",
      "Sports Cars",
      "Mercedes Benz",
      "Luxury",
      "Reviews",
    ],
    Cycling: [
      "Bicycles",
      "Electric Bikes",
      "Helmets",
      "Mountain Bikes",
      "Kickstarter",
      "Buyers Guides",
      "Best Electric Bikes",
    ],
    Flying: [
      "Planes",
      "Jets",
      "Electric Vehicles",
      "Space",
      "Travel",
      "Auctions",
    ],
    Motorcycles: [
      "Best Cafe Racers",
      "Fastest Motorcycles in the World",
      "Electric Motorcycles",
      "Harley Davidson",
      "Cafe Racers",
      "Triumph",
      "Vintage Helmets",
      "Motorcycle Backpacks",
    ],
  },

  Lifestyle: {
    Advice: [
      "Health",
      "Mental Health",
      "COVID-19",
      "Money",
      "Australia",
      "Work",
      "Productivity",
      "Investing",
      "Cryptocurrency",
    ],
    Drinks: ["Whisky", "Beer", "Wine", "Cocktails", "Bars"],
    Fitness: [
      "Workouts",
      "Shoulder Exercises",
      "Bicep Exercises",
      "Triceps Workouts",
      "Chest Workouts",
      "Forearm Workouts",
      "Strongest Celebrities in Hollywood",
      "How to Lose Weight Fast",
      "Celebrity Diet & Workout Plans",
      "Gyms",
      "Diet & Nutrition",
    ],
    Finance: [
      "Money",
      "Cryptocurrency",
      "Investing",
      "NFTs",
      "Australia",
      "Celebrities",
      "Elon Musk",
      "Net Worths",
      "Rich Lists",
    ],
    Food: [
      "Monday Munchies",
      "Restaurants",
      "Fast Food",
      "Sydney",
      "Melbourne",
      "Brisbane",
    ],
    Grooming: [
      "Skincare",
      "Razors",
      "Hair",
      "Beards",
      "Best Beard Oils",
      "Best Body Groomers",
      "Best Face Washes",
      "Men's Skincare Guide",
      "Best Skincare Products",
      "Beard Care Guide",
    ],
    "Sex & Dating": [
      "Best Sex Toys",
      "Best Tinder Bios for Guys",
      "How To Be Sexually Dominant",
      "A Guide to (Safe) Rough Sex",
      "How to Get a Sugar Momma",
      "Tinder Pick-Up Lines for Guys",
      "Best Sex Positions",
      "Best Dating Apps",
    ],
    Travel: [
      "Hotels",
      "Sydney  ",
      "Melbourne",
      "Best Hotels in the World",
      "Travel Gifts",
      "World's Best Rooftop Bars",
      "Skyscanner Alternatives",
      "Qantas",
    ],
  },
  Entertainment: {
    Art: ["NFTs", "Auctions", "Tattoos", "Collections", "Memes"],
    Books: [
      "Coffee Table Books",
      "Self-Help Books",
      "Cookbooks",
      "Best Kindles",
    ],
    Gaming: [
      "Top New Games",
      "Playstation",
      "Xbox",
      "PC",
      "Nintendo Switch",
      "LEGO",
      "Sony",
      "Reviews",
    ],
    "Movies & TV": [
      "Guide to Streaming Services",
      "New on Netflix",
      "New on Prime Video",
      "New on Disney+",
      "New on Stan Australia",
      "Best Action Movies",
      "Best Sci-Fi Movies",
      "Trailers",
      "Netflix",
      "Best Movies on Netflix",
      "Best Amazon Prime Movies",
      "Best Shows on Netflix",
      "Documentaries",
      "James Bond",
    ],
    Music: ["Guitars", "Festivals", "Hip Hop"],
    Sport: [
      "Golf",
      "NBA",
      "Football",
      "Boxing",
      "Tennis",
      "UFC",
      "AFL",
      "Formula 1",
    ],
  },
  Living: {
    Appliances: [
      "Vacuum Cleaners",
      "Coffee",
      "Kitchens",
      "Cooking",
      "Lighting",
      "Dyson",
      "Best Coffee Machines",
      "Best Air Fryers",
      "Best Robot Vacuums",
    ],
    Architecture: [
      "Homes",
      "Design",
      "Real Estate",
      "Interior Design",
      "Penthouses",
      "Celebrity Homes",
    ],
    Furniture: [
      "Desks",
      "IKEA",
      "Interior Design",
      "Homes",
      "Italian",
      "Chairs",
      "Office",
      "Tables",
      "Design",
      "Herman Miller",
    ],
    Homewares: [],
  },
  Outdoors: {
    Camping: [
      "Tents",
      "Campervans",
      "Knives",
      "Vehicles",
      "Australia",
      "4WD",
      "Fishing",
      "Kayaks",
      "Kickstarter",
    ],
    Snow: [
      "Skiing",
      "Snowboarding",
      "Cabins",
      "Best Ski Jackets",
      "Best Snow Goggles",
      "Best Ski Fields in New Zealand",
      "Winter Must Haves",
      "Best Australian Ski Fields",
    ],
    Surfing: [
      "Beaches",
      "Wetsuits",
      "Surfboards",
      "Best Wetsuit Tops",
      "Best Wetsuits for Surfing",
    ],
    Skate: [],
    Hiking: [],
  },
  News: [],
};

function Category({ decodedslug, totalBlogs }) {
  const [categoryList, SetCategoryList] = useState([]);

  useEffect(() => {
    const input = decodedslug[decodedslug.length - 1].trim().toLowerCase();
    for (const [category, subCategory] of Object.entries(subSections)) {
      if (input === category.toLowerCase()) {
        console.log(Object.keys(subCategory));
        SetCategoryList(Object.keys(subCategory));
      }

      // Check if the input matches a sub-category
      for (const [subCategoryKey, items] of Object.entries(subCategory)) {
        if (input === subCategoryKey.toLowerCase()) {
          console.log(items);
          SetCategoryList(items);
        }
      }
    }
  }, [decodedslug]);

  return (
    <div className=" text-center flex flex-col items-center gap-4 px-4 pb-3 mt-[90px] ">
      <nav
        className="flex tracking-wider justify-start w-full xl:max-w-[73rem]"
        aria-label="Breadcrumb"
      >
        <ul className="flex items-center text-xs md:text-[14px] ">
          <li className="inline-flex items-center">
            <Link
              className="inline-flex items-center  font-medium text-gray-500 hover:text-blue-600 "
              href="/"
            >
              {" "}
              Home
            </Link>
          </li>
          {decodedslug.map((item, i) => {
            const url = `/${decodedslug.slice(0, i + 1).join("/")}`;

            return (
              <li key={i} className="flex items-center">
                <svg
                  className="rtl:rotate-180 w-2 h-2 text-black mx-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>

                <a
                  href={url}
                  className="inline-flex capitalize items-center  font-medium text-gray-500 hover:text-blue-600 "
                >
                  {item}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <h1 className="text-2xl font-semibold border-b border-black pb-4 capitalize sm:text-[25px] md:text-[30px] ">
        {decodedslug[decodedslug.length - 1]}
      </h1>
      <p className="text-sm text-gray-800  md:w-[70%] xl:w-[60%] 2xl:w-[50%]">
        The latest news and reviews of everything Apple. From AppleTV to
        AirPods, MacBooks to iPads, Apple Watches, accessories and more.
      </p>
      <div className="overflow-scroll  no-scrollbar w-full">
        <ul className="flex items-center text-xs  py-8 gap-12 justify-center md:gap-16">
          {categoryList.map((item, i) => (
            <li key={i}>
              <Link href="/go">{item}</Link>
            </li>
          ))}
        </ul>
      </div>
      <h1 className="text-sm font-semibold tracking-wider  ">
        {totalBlogs} {decodedslug[decodedslug.length - 1]} Articles Published
      </h1>
    </div>
  );
}

export default Category;
