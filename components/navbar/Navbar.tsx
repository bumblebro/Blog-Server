import { button } from "@nextui-org/react";

interface Navbar {
  SetSideBar: Function;
  sidebar: boolean;
}

function Navbar({ SetSideBar, sidebar }: Navbar) {
  return (
    <div className="bg-black text-white  md:py-4  w-full px-4 fixed top-0 z-50 h-[70px] ">
      <div className="grid grid-cols-3 py-3 md:py-0 xl:max-w-[73rem] mx-auto  my-auto h-full  ">
        {" "}
        <div className="flex items-center gap-2">
          {sidebar ? (
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-8"
                onClick={() => {
                  SetSideBar((prev: boolean) => !prev);
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </a>
          ) : (
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-8"
                onClick={() => {
                  SetSideBar((prev: boolean) => !prev);
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </a>
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
        <div className="flex justify-center items-center">
          {" "}
          <a href="/">
            <h1 className="uppercase font-semibold tracking-[3px] text-[5vw] md:text-[1.1rem]  lg:text-[1.4rem] xl:text-[1.7rem] text-center  ">
              manofmany
            </h1>
          </a>
        </div>
        <div className="flex justify-end items-center">
          <h1 className="bg-[#0c50e6] w-fit   uppercase tracking-wider text-xs font-semibold py-1 px-2 rounded-full md:text-base md:px-4 md:py-0 2xl:py-2 2xl:px-6">
            Subscribe
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
