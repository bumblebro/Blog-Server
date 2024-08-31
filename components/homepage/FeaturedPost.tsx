function FeaturedPost() {
  return (
    <div className="  mx-auto   px-4 mt-[69px]">
      <div className="flex flex-col items-center relative md:flex-row md:justify-between  md:h-[25rem] md:pt-4 xl:h-[25rem] xl:max-w-[73rem] mx-auto">
        <div className="flex justify-center pt-4 h-64 md:h-full md:pt-0 md:w-[50%]">
          <img
            className="  object-cover md:px-0 w-full"
            src="https://manofmany.com/_next/image?url=https%3A%2F%2Fapi.manofmany.com%2Fwp-content%2Fuploads%2F2024%2F07%2FROG-Ally-X-screen-up-close.jpg&w=1200&q=75"
            alt=""
          />
        </div>
        <div className="bg-black text-white  text-center  w-[90%] py-6 absolute top-[80%] px-6 md:relative md:h-full md:top-0 md:flex md:flex-col md:justify-center md:w-[50%]">
          <h1 className="pb-3 text-blue-600 font-semibold md:text-lg md:pb-5">
            Gaming
          </h1>
          <h2 className="text-xl font-semibold md:text-3xl">
            2078HP Track-Ready Rimac Nevera R is a Road-Going Missile
          </h2>
        </div>
      </div>
    </div>
  );
}

export default FeaturedPost;
