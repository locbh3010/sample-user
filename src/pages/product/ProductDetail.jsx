import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
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
import { userStore } from "../../store/user-store";
import { toast } from "react-toastify";

const notifySuccess = () => {
  toast.success("Thêm vào giỏ hàng thành công");
};

const ProductDetail = () => {
  const { id } = useParams();
  const { user } = userStore((state) => state);
  const colRef = collection(db, "products");
  const productRef = doc(colRef, id);
  const description = useRef(null);
  const descriptionShowcase = useRef(null);
  const navigate = useNavigate();
  const [amount, setAmount] = useState(1);

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
    descriptionShowcase.current.textContent = "";
    description.current.insertAdjacentHTML("beforeend", product?.description);
    descriptionShowcase.current.insertAdjacentHTML(
      "beforeend",
      product?.description
    );
  }, [product]);

  const handleAddToCart = useCallback(() => {
    if (user) {
      const uid = user.id;
      const pid = product.id;
      const cartRef = collection(db, "carts");
      const cart = doc(cartRef, uid);

      getDoc(cart).then((res) => {
        if (res.data()?.items) {
          const items = res.data().items;
          const index = items.findIndex((obj) => {
            return obj.pid === pid;
          });

          if (index !== -1) {
            items[index].amount = amount;
            setDoc(cart, { items });
            return;
          } else {
            items.unshift({
              amount,
              pid,
              price: product.price,
              name: product.name,
            });
            setDoc(cart, { items }).then(notifySuccess);
            return;
          }
        } else {
          const data = {
            items: [{ pid, amount, price: product.price, name: product.name }],
          };
          setDoc(cart, data).then(notifySuccess);
        }
      });
    } else {
      navigate("/sign-in");
    }
  }, [amount, product]);
  const handleActionAmount = (e) => {
    const type = e.target.dataset.type;
    switch (type) {
      case "inc":
        if (amount < product.count) {
          setAmount(amount + 1);
        } else {
          setAmount(+product.count);
        }
        break;
      case "dec":
        if (amount > 1) {
          setAmount(amount - 1);
        } else {
          setAmount(1);
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="mt-[128px] mb-[250px]">
      <div className="container">
        <div className="grid grid-cols-2 gap-16">
          <div className="aspect-square overflow-hidden border border-gray-300">
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
              className="py-12 text-gray-dark mb-10 text-ellipsis line-clamp-1"
              ref={descriptionShowcase}
            ></p>
            <div className="flex gap-4">
              <div className="flex-shrink-0 grid grid-cols-3 rounded bg-gray-light text-gray-dark font-bold basis-1/3 overflow-hidden select-none">
                <div
                  className="aspect-square flex items-center justify-center h-full cursor-pointer duration-300 hover:bg-gray-400 rounded-l"
                  data-type="dec"
                  onClick={handleActionAmount}
                >
                  -
                </div>
                <div className="aspect-square flex items-center justify-center h-full cursor-pointer">
                  {amount}
                </div>
                <div
                  className="aspect-square flex items-center justify-center h-full cursor-pointer duration-300 hover:bg-gray-400 rounded-r"
                  data-type="inc"
                  onClick={handleActionAmount}
                >
                  +
                </div>
              </div>
              <Button onClick={handleAddToCart}>add to cart</Button>
            </div>
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

export default React.memo(ProductDetail);
