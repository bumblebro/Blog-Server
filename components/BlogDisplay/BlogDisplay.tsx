function BlogDisplay({ decodedslug }) {
  return (
    <div>
      <h1 className="text-2xl font-semibold border-b-[0.1px]  border-gray-500  capitalize sm:text-[25px] md:text-[30px] ">
        {decodedslug[decodedslug.length - 1]}
      </h1>
    </div>
  );
}

export default BlogDisplay;
