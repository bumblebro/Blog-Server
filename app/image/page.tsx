"use client";

import axios from "axios";
import { useEffect, useState } from "react";

function page() {
  const accessKey = "zJ9mfGnzI92vuyQx0VqTBNHdc1nEpCm35_ygcSXAwGw";
  const query = "iphone se 3 review";

  const [img, setImg] = useState();

  useEffect(() => {
    async function run() {
      const response = await axios.get(
        `https://api.unsplash.com/photos/random`,
        {
          params: { query: query },
          headers: {
            Authorization: `Client-ID 4VdQLAuvzXLHz6j7JRCejog5QPlgvy0BGw7njD-u_hk`,
          },
        }
      );

      console.log(response.data.urls.regular);
      setImg(response.data.urls.regular);
    }
    run();
  }, []);
  return (
    <div className="w-6/12">
      <img src={img} alt="" />
    </div>
  );
}

export default page;
