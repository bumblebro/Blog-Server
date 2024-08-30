"use client";

import { useEffect, useState } from "react";

const tech = ["Apple", "Audio", "Cameras", "Computers", "Smartphones", "TVs"];

const apple = ["iPhone", "MacBook", "iPad"];
const audio = ["Headphones", "Speakers", "Earbuds"];
const cameras = ["DSLR", "Mirrorless", "Action Cameras"];
const computers = ["Laptops", "Desktops", "Tablets"];
const smartphones = ["Android", "iOS", "Windows Phone"];
const tvs = ["LG", "Samsung", "Sony", "Projectors"];

const fashion = [
  "Men's Fashion Advice",
  "Men's Fashion Trends",
  "Men's Fragrances",
  "Men's Hairstyles",
  "Sneakers & Shoes",
  "Watches",
];

const mensFashionAdvice = ["Formal", "Casual", "Business Casual"];
const mensFashionTrends = ["Seasonal Trends", "Streetwear", "Minimalist"];
const mensFragrances = ["Cologne", "Perfume", "Body Spray"];
const mensHairstyles = ["Short", "Medium", "Long"];
const sneakersShoes = ["Sneakers", "Dress Shoes", "Boots"];
const watches = ["Analog", "Digital", "Smartwatches"];

const rides = ["Boats", "Cars", "Cycling", "Flying", "Motorcycles"];

const boats = ["Yachts", "Superyachts", "Sailing", "Jetskis", "Submarines"];
const cars = [
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
];
const cycling = [
  "Bicycles",
  "Electric Bikes",
  "Helmets",
  "Mountain Bikes",
  "Kickstarter",
  "Buyers Guides",
  "Best Electric Bikes",
];
const flying = [
  "Planes",
  "Jets",
  "Electric Vehicles",
  "Space",
  "Travel",
  "Auctions",
];
const motorcycles = [
  "Best Cafe Racers",
  "Fastest Motorcycles in the World",
  "Electric Motorcycles",
  "Harley Davidson",
  "Cafe Racers",
  "Triumph",
  "Vintage Helmets",
  "Motorcycle Backpacks",
];

const lifestyle = [
  "Advice",
  "Drinks",
  "Fitness",
  "Finance",
  "Food",
  "Grooming",
  "Sex & Dating",
  "Travel",
];

const advice = [
  "Health",
  "Mental Health",
  "COVID-19",
  "Money",
  "Australia",
  "Work",
  "Productivity",
  "Investing",
  "Cryptocurrency",
];
const drinks = ["Whisky", "Beer", "Wine", "Cocktails", "Bars"];
const fitness = [
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
];
const finance = [
  "Money",
  "Cryptocurrency",
  "Investing",
  "NFTs",
  "Australia",
  "Celebrities",
  "Elon Musk",
  "Net Worths",
  "Rich Lists",
];
const food = [
  "Monday Munchies",
  "Restaurants",
  "Fast Food",
  "Sydney",
  "Melbourne",
  "Brisbane",
];
const grooming = [
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
];
const sexDating = [
  "Best Sex Toys",
  "Best Tinder Bios for Guys",
  "How To Be Sexually Dominant",
  "A Guide to (Safe) Rough Sex",
  "How to Get a Sugar Momma",
  "Tinder Pick-Up Lines for Guys",
  "Best Sex Positions",
  "Best Dating Apps",
];
const travel = [
  "Hotels",
  "Sydney",
  "Melbourne",
  "Best Hotels in the World",
  "Travel Gifts",
  "World's Best Rooftop Bars",
  "Skyscanner Alternatives",
  "Qantas",
];

const entertainment = [
  "Art",
  "Books",
  "Gaming",
  "Movies & TV",
  "Music",
  "Sport",
];

const art = ["NFTs", "Auctions", "Tattoos", "Collections", "Memes"];
const books = [
  "Coffee Table Books",
  "Self-Help Books",
  "Cookbooks",
  "Best Kindles",
];
const gaming = [
  "Top New Games",
  "Playstation",
  "Xbox",
  "PC",
  "Nintendo Switch",
  "LEGO",
  "Sony",
  "Reviews",
];
const moviesTV = [
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
];
const music = ["Guitars", "Festivals", "Hip Hop"];
const sport = [
  "Golf",
  "NBA",
  "Football",
  "Boxing",
  "Tennis",
  "UFC",
  "AFL",
  "Formula 1",
];

const living = ["Appliances", "Architecture", "Furniture", "Homewares"];

const appliances = [
  "Vacuum Cleaners",
  "Coffee",
  "Kitchens",
  "Cooking",
  "Lighting",
  "Dyson",
  "Best Coffee Machines",
  "Best Air Fryers",
  "Best Robot Vacuums",
];
const architecture = [
  "Homes",
  "Design",
  "Real Estate",
  "Interior Design",
  "Penthouses",
  "Celebrity Homes",
];
const furniture = [
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
];
const homewares = [];

const outdoors = ["Camping", "Snow", "Surfing", "Skate", "Hiking"];

const camping = [
  "Tents",
  "Campervans",
  "Knives",
  "Vehicles",
  "Australia",
  "4WD",
  "Fishing",
  "Kayaks",
  "Kickstarter",
];
const snow = [
  "Skiing",
  "Snowboarding",
  "Cabins",
  "Best Ski Jackets",
  "Best Snow Goggles",
  "Best Ski Fields in New Zealand",
  "Winter Must Haves",
  "Best Australian Ski Fields",
];
const surfing = [
  "Beaches",
  "Wetsuits",
  "Surfboards",
  "Best Wetsuit Tops",
  "Best Wetsuits for Surfing",
];
const skate = [];
const hiking = [];

const news = [];

function Category({ decodedslug, totalBlogs }) {
  return (
    <div className=" text-center flex flex-col items-center gap-4 px-4 pb-3 mt-[90px]">
      <nav className="flex tracking-wider" aria-label="Breadcrumb">
        <ol className="inline-flex items-center  ">
          <li className="inline-flex items-center">
            <a
              href="/"
              className="inline-flex items-center text-xs font-medium text-gray-500 hover:text-blue-600 "
            >
              Home
            </a>
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
                  className="inline-flex capitalize items-center text-xs font-medium text-gray-500 hover:text-blue-600 "
                >
                  {item}
                </a>
              </li>
            );
          })}
        </ol>
      </nav>

      <h1 className="text-2xl font-semibold border-b border-black pb-4 capitalize">
        {decodedslug[decodedslug.length - 1]}
      </h1>
      <p className="text-sm text-gray-800 ">
        The latest news and reviews of everything Apple. From AppleTV to
        AirPods, MacBooks to iPads, Apple Watches, accessories and more.
      </p>
      <div className="overflow-scroll w-11/12 no-scrollbar">
        <ul className="flex text-xs justify-between  py-10 w-[130%]  ">
          {decodedslug[decodedslug.length]}
          <li>iPhone</li>
          <li>Airpods</li>
          <li>Apple Watch</li>
          <li>Macbook</li>
          <li>Apple TV+</li>
        </ul>
      </div>
      <h1 className="text-sm font-semibold tracking-wider ">
        {totalBlogs} {decodedslug[decodedslug.length - 1]} Articles Published
      </h1>
    </div>
  );
}

export default Category;
