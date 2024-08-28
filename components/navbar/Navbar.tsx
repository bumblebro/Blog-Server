function Navbar({ SetSideBar, sidebar }) {
  return (
    <div className="bg-black text-white pb-6">
      <div className="flex justify-between items-center py-3 px-3 ">
        {" "}
        <div className="flex items-center gap-2">
          {sidebar ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-8"
              onClick={() => {
                SetSideBar((prev) => !prev);
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-8"
              onClick={() => {
                SetSideBar((prev) => !prev);
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          )}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>
        <h1 className="uppercase font-semibold tracking-wider text-xl">
          Man of Many
        </h1>
        <h1 className="bg-[#0c50e6] uppercase text-xs font-semibold py-1 px-2 rounded-full">
          Subscribe
        </h1>
      </div>
    </div>
  );
}

export default Navbar;
