"use client";

import { useState } from "react";
import copy from "clipboard-copy";

function CopyBtn({ text }: { text: string }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = async () => {
    try {
      await copy(process.env.NEXT_PUBLIC_BASE_API_URL + text);
      setIsCopied(true);
    } catch (error) {
      console.error("Failed to copy text to clipboard", error);
    }
  };

  return (
    <button
      onClick={handleCopyClick}
      className="uppercase flex justify-center items-center bg-[#ee5631]  rounded-md py-[0.6rem] w-full gap-2  hover:bg-[#ee5731c8]"
      type="button"
    >
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
          d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
        />
      </svg>
      <h1> {isCopied ? "Copied!" : "Copy Link"} </h1>
    </button>
  );
}

export default CopyBtn;
