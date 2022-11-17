import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../configs/firebase-configs";
import { ProductItem, ProductList } from "../../components/ui/product/Product";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper";
import Button from "../../components/ui/button/Button";

const ProductDetail = () => {
  const { id } = useParams();
  const colRef = collection(db, "products");
  const productRef = doc(colRef, id);
  const description = useRef(null);

  const [product, setProduct] = useState({});
  const [similars, setSimilars] = useState([]);

  useEffect(() => {
    getDoc(productRef).then((res) => {
      setProduct({ id: res.id, ...res.data() });
    });
  }, [id]);
  useEffect(() => {
    if (product?.cateId) {
      const similarRef = query(
        colRef,
        where("cateId", "==", product.cateId),
        where(documentId(), "!=", id)
      );

      getDocs(similarRef).then((res) => {
        const docs = res.docs;
        let temp = [];

        docs?.length > 0 &&
          docs.map((doc) => {
            temp.push({ id: doc.id, ...doc.data() });
          });

        setSimilars(temp);
      });
    }
  }, [product]);
  useEffect(() => {
    description.current.textContent = "";
    description.current.insertAdjacentHTML("beforeend", product?.description);
  }, [product]);

  return (
    <div className="mt-[128px] mb-[250px]">
      <div className="container">
        <div className="grid grid-cols-2 gap-16">
          <div className="aspect-square overflow-hidden rounded-lg">
            <Swiper
              pagination={{
                type: "progressbar",
              }}
              navigation={true}
              modules={[Pagination, Navigation, Autoplay]}
              className="w-full h-full flex"
              autoplay={{
                delay: 1500,
                disableOnInteraction: false,
              }}
            >
              {product?.images?.length > 0 &&
                product.images.map((img) => (
                  <SwiperSlide
                    key={img}
                    className="basis-full flex-shrink-0 w-full"
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
          <div>
            <h1 className="text-3xl text-black mb-6 font-medium">
              {product?.name}
            </h1>
            <span className="block text-accent font-medium text-xl">
              ${product?.price}
            </span>
            <p
              className="py-12 line-clamp-4 text-gray-dark"
              ref={description}
            ></p>
            <Button>add to cart</Button>
            <div className="mt-16 flex flex-col gap-2">
              <p className="text-black font-medium">
                SKU: <span className="text-gray-dark">{product?.count}</span>
              </p>
              <p className="text-black font-medium">
                Categories:{" "}
                <span className="text-gray-dark">{product?.cateName}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="py-24">
          <p className="mb-8 text-black font-medium text-xl">Description</p>
          <span className="block w-full h-0.5 bg-gray-light mb-10"></span>
          <p ref={description} className="text-dark-gray"></p>
        </div>

        <div>
          <h2 className="text-[26px] mb-12 font-medium capitalize">
            Similar Items
          </h2>
          <ProductList>
            {similars?.length > 0 &&
              similars.map((similar) => (
                <ProductItem key={similar.id} data={similar} />
              ))}
          </ProductList>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
