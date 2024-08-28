function BlogList({ posts }) {
  return (
    <div>
      {posts.map((item, index) => (
        <div key={index} className="flex flex-col gap-3 pb-14 pt-4">
          <img
            className="h-[65vw] object-cover"
            src={item.blogDetails[0].url}
            alt=""
          />
          <h1 className="text-sm text-blue-600 font-semibold">
            {item.subsection}
          </h1>
          <h2 className="font-semibold">{item.blogDetails[0].title}</h2>
        </div>
      ))}
      <div className="flex justify-end font-medium  mb-10  ">
        {" "}
        <button
          // onClick={handleClick}
          type="button"
          className="bg-black text-white py-3 px-4 rounded-lg flex  items-center gap-2"
        >
          <p>Next</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
            stroke="currentColor"
            className="w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default BlogList;
