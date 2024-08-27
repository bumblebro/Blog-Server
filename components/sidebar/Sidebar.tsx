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
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h1 className="font-semibold pb-4">Tech</h1>
            <ul className="font-light flex flex-col gap-3 ">
              {Tech.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className="font-semibold pb-4">Fashion</h1>
            <ul className="font-light flex flex-col gap-3">
              {Fashion.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className="font-semibold pb-4">Rides</h1>
            <ul className="font-light flex flex-col gap-3 ">
              {Rides.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className="font-semibold pb-4">Lifestyle</h1>
            <ul className="font-light flex flex-col gap-3 ">
              {Lifestyle.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className="font-semibold pb-4">Entertainment</h1>
            <ul className="font-light flex flex-col gap-3 ">
              {Entertainment.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className="font-semibold pb-4">Living</h1>
            <ul className="font-light flex flex-col gap-3 ">
              {Living.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className="font-semibold pb-4">Outdoors</h1>
            <ul className="font-light flex flex-col gap-3 ">
              {Outdoors.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className="font-semibold pb-4">News</h1>
            <ul className="font-light flex flex-col gap-3 ">
              {News.map((item, index) => (
                <li key={index}>{item}</li>
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
