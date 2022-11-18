import React from "react";
import { useForm } from "react-hook-form";
import { BlogItem } from "../../components/ui/blog/BlogUi";
import Input from "../../components/ui/input/Input";

const Blogs = () => {
  const { control, handleSubmit } = useForm({ mode: onchange });
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
            <span>fashion</span>
            <span>style</span>
            <span>accessories</span>
            <span>season</span>
          </div>
        </div>
        {/* show */}
        <div>
          <div className="grid grid-cols-2 gap-12 grid-flow-row auto-rows-fr">
            <BlogItem />
            <BlogItem />
          </div>
          <div className="mt-16 flex gap-2 items-center justify-center">
            <div className="w-10 h-10 flex-center rounded bg-black text-white text-sm border border-black cursor-pointer">
              1
            </div>
            <div className="w-10 h-10 flex-center rounded bg-transparent text-black text-sm border border-black cursor-pointer">
              2
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
