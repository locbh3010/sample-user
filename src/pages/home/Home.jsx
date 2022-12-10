import { limit, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../configs/firebase-configs";
import { collection } from "firebase/firestore";
import { Link } from "react-router-dom";
import {
  ProductItem,
  ProductItemSkeleton,
  ProductList,
} from "../../components/ui/product/Product";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper";
import banner1 from "../../images/banner (1).jpg";
import banner2 from "../../images/banner (2).jpg";
import banner3 from "../../images/banner (3).jpg";
import banner4 from "../../images/banner (4).jpg";
import Tooltip from "../../components/ui/Tooltip";
import clsx from "clsx";
import Grid from "../../components/layout/Grid";

const slideImage = [banner1, banner2, banner3, banner4];

const Home = () => {
  const colRef = query(collection(db, "products"), limit(8));
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
            className={clsx("w-full flex h-[50vh]", "lg:aspect-video")}
            autoplay={{
              delay: 2300,
              disableOnInteraction: false,
            }}
            loop={true}
          >
            {slideImage?.length > 0 &&
              slideImage.map((img) => (
                <SwiperSlide key={img}>
                  <img
                    src={img}
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
          <h2 className={clsx("text-xl font-medium", "sm:text-2xl")}>
            Shop The Latest
          </h2>
          <Tooltip tip="Go to shop">
            <Link
              className={clsx(
                "capitalize text-base font-medium text-accent",
                "sm:text-lg",
                "md:text-xl"
              )}
              to="/shop"
            >
              View All
            </Link>
          </Tooltip>
        </div>
        <Grid
          gap={6}
          className="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
        >
          {products?.length > 0 ? (
            products.map((product) => (
              <ProductItem data={product} key={product.id}></ProductItem>
            ))
          ) : (
            <>
              <ProductItemSkeleton />
              <ProductItemSkeleton />
              <ProductItemSkeleton />
              <ProductItemSkeleton />
            </>
          )}
        </Grid>
      </div>
    </div>
  );
};

export default Home;
