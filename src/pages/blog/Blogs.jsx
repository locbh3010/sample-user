import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BlogItem } from "../../components/ui/blog/BlogUi";
import Input from "../../components/ui/input/Input";
import { db } from "../../configs/firebase-configs";

const filterList = ["fashion", "style", "accessories", "season"];
const Blogs = () => {
  const { control } = useForm({ mode: onchange });
  const [blogs, setBlogs] = useState([]);
  const [filter, setFilter] = useState({
    text: "",
    category: 0,
  });

  const hanldeGetData = (res) => {
    let temp = [];
    res.docs.length > 0 &&
      res.docs.map((doc) => temp.push({ id: doc.id, ...doc.data() }));

    setBlogs(temp);
  };
  useEffect(() => {
    const blogsRef = collection(db, "blogs");
    let blogQuery = blogsRef;
    if (filter.category) {
      blogQuery = query(blogsRef, where("categories", "==", filter.category));
    }

    onSnapshot(blogQuery, hanldeGetData);
  }, [filter]);
  const handleSetFilter = (e) => {
    setFilter({
      ...filter,
      [e.target.dataset.type]: e.target.dataset.value,
    });
  };

  return (
    <div className="container pt-24 pb-[250px]">
      <h1 className="text-3xl font-bold text-black mb-8">Blog</h1>
      <div className="flex items-start gap-10">
        {/* filter */}
        <div className="flex-shrink-0 basis-[25%]">
          <div className="mb-16">
            <form>
              <Input
                control={control}
                name="search"
                placeholder="Search..."
              ></Input>
            </form>
          </div>
          <h2 className="mb-5.5 font-semibold text-black first-letter:capitalize text-2xl">
            categories
          </h2>
          <div className="flex flex-col items-start gap-2.5 capitalize text-gray-dark">
            {filterList.map((fil) => (
              <span
                key={fil}
                onClick={handleSetFilter}
                data-type="category"
                data-value={fil}
              >
                {fil}
              </span>
            ))}
          </div>
        </div>
        {/* show */}
        <div>
          <div className="grid grid-cols-2 gap-12 grid-flow-row auto-rows-fr">
            {blogs?.length > 0 &&
              blogs.map((blog) => <BlogItem key={blog.id} blog={blog} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
