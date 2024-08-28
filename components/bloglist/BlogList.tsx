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
    </div>
  );
}

export default BlogList;
