"use client";

import Category from "@/components/category/Category";
import Footer from "@/components/footer/Footer";
import FeaturedPost from "@/components/homepage/FeaturedPost";
import LatestPost from "@/components/homepage/LatestPost";
import Navbar from "@/components/navbar/Navbar";
import Sidebar from "@/components/sidebar/Sidebar";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { URLSearchParams } from "url";

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
          <Category />
          <LatestPost />
        </>
      )}
      <Footer />
    </>
  );
}

export default HomePage;
