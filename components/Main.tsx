"use client";

import axios from "axios";
import { useEffect, useState } from "react";

function Main() {
  const [text, setText] = useState("HELLO");
  useEffect(() => {
    async function run() {
      const ans = await axios.post("http://localhost:3001/api/signin", {
        question: "Generate blog post about latest tech trends",
      });
      const ansdata = await ans.data;
      setText(ansdata);
    }
    run();
  }, []);

  return (
    <div>
      <h1>{text}</h1>
    </div>
  );
}

export default Main;
