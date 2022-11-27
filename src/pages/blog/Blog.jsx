import { collection, doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../configs/firebase-configs";

const Blog = () => {
  const { id } = useParams();
  const content = useRef(null);
  const [blog, setBlog] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const blogRef = doc(collection(db, "blogs"), id);
    onSnapshot(blogRef, (res) => {
      if (res.data()) {
        setBlog({ id: res.id, ...res.data() });
        content.current.textContent = "";
        content.current.insertAdjacentHTML("beforeend", res.data().description);
      } else {
        navigate("/not-found");
      }
    });
  }, [id]);
  return (
    <div className="py-24 pb-[250px]">
      {blog && (
        <div className="container">
          <div className="text-center">
            <h1 className="mb-4 text-black capitalize font-bold text-3xl">
              {blog?.name}
            </h1>
          </div>
          <div className="rounded-lg overflow-hidden h-[70vh] w-full mt-10">
            <img
              src={blog?.image}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <p className="max-w-4xl mx-auto mt-16" ref={content}></p>
        </div>
      )}
    </div>
  );
};

export default Blog;
