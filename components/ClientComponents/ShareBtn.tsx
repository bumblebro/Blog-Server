"use client";

import { RWebShare } from "react-web-share";

function ShareBtn({
  text,
  url,
  title,
}: {
  text: string;
  url: string;
  title: string;
}) {
  return (
    <RWebShare
      data={{
        text,
        url,
        title,
      }}
      onClick={() => console.log("shared successfully!")}
    >
      <button className="uppercase flex justify-center items-center border-[#ee5631] border-solid border-2 rounded-md py-[0.5rem] gap-2 w-full hover:bg-[#ee5731ca] hover:border-[#ee5731ca] focus:bg-[#ee5631] focus:border-[#ee5631]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
          />
        </svg>{" "}
        <h1> Share</h1>
      </button>
    </RWebShare>
  );
}

export default ShareBtn;
