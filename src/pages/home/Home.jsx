import { limit, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../configs/firebase-configs";
import { collection } from "firebase/firestore";
import { Link } from "react-router-dom";
import { ProductItem, ProductList } from "../../components/ui/product/Product";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper";

const Home = () => {
  const colRef = query(collection(db, "products"), limit(6));
  const [products, setProducts] = useState([]);

  useEffect(() => {
    onSnapshot(colRef, (res) => {
      const docs = res.docs;
      let temp = [];

      docs?.length > 0 &&
        docs.map((doc) => temp.push({ id: doc.id, ...doc.data() }));

      setProducts(temp);
    });
  }, []);

  return (
    <div className="w-full">
      <div className="container">
        <div className="overflow-hidden relative border border-gray-300">
          <Swiper
            pagination={{
              type: "progressbar",
            }}
            navigation={true}
            modules={[Pagination, Navigation, Autoplay]}
            className="w-full flex h-[60vh]"
            autoplay={{
              delay: 1500,
              disableOnInteraction: false,
            }}
          >
            {products?.length > 0 &&
              products.map((product) => (
                <SwiperSlide key={product.id}>
                  <img
                    src={product.images[0]}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </SwiperSlide>
              ))}
          </Swiper>
          <div className="absolute left-10 top-1/2 -translate-y-1/2 text-white">
            <h1 className="text-4xl font-medium mb-4">{products[0]?.name}</h1>
            <span className="text-[26px]">${products[0]?.price}</span>
            <Link
              className="block mt-12 rounded-md border border-white py-3 px-8 font-bold text-xl"
              to={`/product/${products[0]?.id}`}
            >
              View Product
            </Link>
          </div>
        </div>
      </div>
      <div className="container mt-16 mb-[250px]">
        <div className="flex items-center justify-between mb-10">
          <h2 className="font-medium text-3xl">Shop The Latest</h2>
          <Link
            className="capitalize text-xl font-medium text-accent"
            to="/shop"
          >
            View All
          </Link>
        </div>
        <ProductList>
          {products?.length > 0 &&
            products.map((product) => (
              <ProductItem data={product} key={product.id}></ProductItem>
            ))}
        </ProductList>
      </div>
    </div>
  );
};

export default Home;
