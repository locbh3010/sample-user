import React from "react";
import { BlogItem } from "../../components/ui/blog/BlogUi";

const Blogs = () => {
  return (
    <div className="container pt-24 pb-[250px]">
      <div className="grid grid-cols-3 gap-12">
        <BlogItem />
        <BlogItem />
        <BlogItem />
      </div>
    </div>
  );
};

export default Blogs;
