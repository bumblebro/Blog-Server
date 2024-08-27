"use client";

import Footer from "@/components/footer/Footer";
import FeaturedPost from "@/components/homepage/FeaturedPost";
import LatestPost from "@/components/homepage/LatestPost";
import Navbar from "@/components/navbar/Navbar";
import Sidebar from "@/components/sidebar/Sidebar";
import { useState } from "react";

function HomePage() {
  const [sidebar, SetSideBar] = useState(false);

  return (
    <>
      <Navbar SetSideBar={SetSideBar} sidebar={sidebar} />
      {sidebar ? (
        <Sidebar />
      ) : (
        <>
          <FeaturedPost />
          <LatestPost />
        </>
      )}
      <Footer />
    </>
  );
}

export default HomePage;
