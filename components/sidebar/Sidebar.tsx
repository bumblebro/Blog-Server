import Link from "next/link";
import Footer from "../footer/Footer";

const Tech = ["Apple", "Audio", "Cameras", "Computers", "Smartphones", "TVs"];
const Fashion = [
  "Men's Fashion Advice",
  "Men's Fashion Trends",
  "Men's Fragrances",
  "Men's Hairstyles",
  "Sneakers & Shoes",
  "Watches",
];
const Rides = ["Boats", "Cars", "Cycling", "Flying", "Motorcycles"];
const Lifestyle = [
  "Advice",
  "Drinks",
  "Fitness",
  "Finance",
  "Food",
  "Grooming",
  "Sex & Dating",
  "Travel",
];
const Entertainment = [
  "Art",
  "Books",
  "Gaming",
  "Movies & TV",
  "Music",
  "Sport",
];
const Living = ["Appliances", "Architecture", "Furniture", "Homewares"];
const Outdoors = ["Camping", "Snow", "Surfing", "Skate", "Hiking"];
const News = [];

function Sidebar() {
  return (
    <div className="duration-1000 ">
      <div className=" backdrop-blur-2xl bg-black  text-white px-4 tracking-wider">
        <h1 className="text-2xl font-semibold py-6">Sections</h1>
        <div className="grid grid-cols-2 gap-10">
          <div>
            <Link href={"/tech"} className="font-semibold ">
              Tech
            </Link>
            <ul className="font-light flex flex-col gap-3 pt-4">
              {Tech.map((item, index) => (
                <li key={index}>
                  <Link href={`/tech/${item}`} key={index}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Link href={"/tech"} className="font-semibold ">
              Fashion
            </Link>
            <ul className="font-light flex flex-col gap-3  pt-4">
              {Fashion.map((item, index) => (
                <li key={index}>
                  <Link href={`/fashion/${item}`} key={index}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Link href={"/tech"} className="font-semibold ">
              Rides
            </Link>
            <ul className="font-light flex flex-col gap-3   pt-4">
              {Rides.map((item, index) => (
                <li key={index}>
                  <Link href={`/Rides/${item}`} key={index}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Link href={"/tech"} className="font-semibold ">
              Lifestyle
            </Link>
            <ul className="font-light flex flex-col gap-3   pt-4">
              {Lifestyle.map((item, index) => (
                <li key={index}>
                  <Link href={`/Lifestyle/${item}`} key={index}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Link href={"/tech"} className="font-semibold ">
              Entertainment
            </Link>
            <ul className="font-light flex flex-col gap-3   pt-4">
              {Entertainment.map((item, index) => (
                <li key={index}>
                  <Link href={`/Entertainment/${item}`} key={index}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Link href={"/tech"} className="font-semibold ">
              Living
            </Link>
            <ul className="font-light flex flex-col gap-3  pt-4 ">
              {Living.map((item, index) => (
                <li key={index}>
                  <Link href={`/Living/${item}`} key={index}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Link href={"/tech"} className="font-semibold ">
              Outdoors
            </Link>
            <ul className="font-light flex flex-col gap-3   pt-4">
              {Outdoors.map((item, index) => (
                <li key={index}>
                  <Link href={`/Outdoors/${item}`} key={index}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Link href={"/tech"} className="font-semibold">
              News
            </Link>
            <ul className="font-light flex flex-col gap-3   pt-4">
              {News.map((item, index) => (
                <li key={index}>
                  <Link href={`/News/${item}`} key={index}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Sidebar;
