function FeaturedPost() {
  return (
    <div className="flex flex-col items-center relative">
      <div className="flex justify-center pt-4 h-64">
        <img
          className=" px-4 object-cover "
          src="https://manofmany.com/_next/image?url=https%3A%2F%2Fapi.manofmany.com%2Fwp-content%2Fuploads%2F2024%2F07%2FROG-Ally-X-screen-up-close.jpg&w=1200&q=75"
          alt=""
        />
      </div>
      <div className="bg-black text-white  text-center  w-[85vw] py-6 absolute top-[80%] px-6">
        <h1 className="pb-3 text-blue-600 font-semibold">Gaming</h1>
        <h2 className="text-xl font-semibold">
          7 Best Handheld Gaming Consoles
        </h2>
      </div>
    </div>
  );
}

export default FeaturedPost;
