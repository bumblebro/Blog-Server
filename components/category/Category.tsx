function Category() {
  return (
    <div className="mt-4 text-center flex flex-col items-center gap-4 px-4 pb-3">
      {/* <h1 className="text-xs font-semibold text-gray-500">Home Tech Apple</h1> */}

      <nav className="flex tracking-wider" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center">
            <a
              href="#"
              className="inline-flex items-center text-xs font-medium text-gray-500 hover:text-blue-600 "
            >
              Home
            </a>
          </li>
          <li>
            <div className="flex items-center">
              <svg
                className="rtl:rotate-180 w-2 h-2 text-black mx-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <a
                href="#"
                className="ms-1 text-xs font-medium text-gray-500 hover:text-blue-600 md:ms-2 "
              >
                Tech
              </a>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <svg
                className="rtl:rotate-180 w-2 h-2 text-black mx-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <span className="ms-1 text-xs font-medium text-gray-500 md:ms-2 ">
                Apple
              </span>
            </div>
          </li>
        </ol>
      </nav>

      <h1 className="text-2xl font-semibold border-b border-black pb-4 ">
        Apple
      </h1>
      <p className="text-sm text-gray-800 ">
        The latest news and reviews of everything Apple. From AppleTV to
        AirPods, MacBooks to iPads, Apple Watches, accessories and more.
      </p>
      <div className="overflow-scroll w-11/12 no-scrollbar">
        <ul className="flex text-xs justify-between  py-10 w-[130%]  ">
          <li>iPhone</li>
          <li>Airpods</li>
          <li>Apple Watch</li>
          <li>Macbook</li>
          <li>Apple TV+</li>
        </ul>
      </div>
      <h1 className="text-sm font-semibold tracking-wider ">
        50 Apple Articles Published
      </h1>
    </div>
  );
}

export default Category;
