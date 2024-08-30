function BlogList({ posts }) {
  return (
    <div className=" container mx-auto mb-10">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4 lg:gap-4 mx-auto  xl:max-w-[73rem]">
        {posts.map((item, index) => (
          <div key={index} className="   pt-4 ">
            <img
              className="h-[75vw] object-cover w-full pb-4 lg:h-[12rem] xl:h-[14rem] md:h-[17rem]"
              src={item.blogDetails[0].url}
              alt=""
            />
            <h1 className="text-md text-blue-600 font-semibold pb-2">
              {item.subsection}
            </h1>
            <h2 className="font-semibold">{item.blogDetails[0].title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogList;
