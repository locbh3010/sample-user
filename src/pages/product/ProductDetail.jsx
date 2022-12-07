import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  limit,
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
import Comment, { CommentShow } from "../../components/ui/comment/Comment";

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
  const [isInFavorites, setIsInFavorites] = useState(false);

  const [product, setProduct] = useState({});
  const [similars, setSimilars] = useState([]);

  useEffect(() => {
    getDoc(productRef).then((res) => {
      setProduct({ id: res.id, ...res.data() });
      !res.data() && navigate("/not-found");
    });
  }, [id]);
  useEffect(() => {
    if (product?.cateId) {
      const similarRef = query(
        colRef,
        where("cateId", "==", product.cateId),
        where(documentId(), "!=", id),
        limit(3)
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
  useEffect(() => {
    if (user) {
      const favoriteRef = doc(collection(db, "favorites"), user?.id);
      onSnapshot(favoriteRef, (res) => {
        if (res.data()?.items?.length > 0) {
          res.data()?.items.forEach((item) => {
            const currentId = item.id;

            currentId === id ? setIsInFavorites(true) : setIsInFavorites(false);
          });
        }
      });
    }
  }, []);

  const handleAddToCart = useCallback(() => {
    if (user && product.count !== 0) {
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
    } else if (!user) {
      navigate("/sign-in");
    } else if (!product.count) toast.error("Đã hết sản phẩm");
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
  const handleFavoriteClick = () => {
    if (user) {
      const favoriteRef = doc(collection(db, "favorites"), user?.id);

      getDoc(favoriteRef).then((res) => {
        if (res.data()?.items) {
          const { items } = res.data();
          if (items.length > 0) {
            const index = items.findIndex((obj) => {
              return obj.id === productRef.id;
            });
            if (index === -1) {
              items.unshift(productRef);
              setDoc(favoriteRef, { items }).then(() => {
                toast.success("Add to favorite success");
                setIsInFavorites(true);
                return;
              });
            } else {
              items.splice(index, 1);
              setDoc(favoriteRef, { items }).then((res) => {
                toast.success("removed from favorites");
                setIsInFavorites(false);
              });
              return;
            }
          } else {
            items.push(productRef);
            setDoc(favoriteRef, { items }).then(() => {
              toast.success("Add to favorite success");
              setIsInFavorites(true);
              return;
            });
          }
        } else {
          const data = {
            items: [productRef],
          };
          setDoc(favoriteRef, data).then(() => {
            toast.success("Add to favorite success");
            setIsInFavorites(true);
            return;
          });
        }
      });
    } else {
      navigate("/sign-in");
    }
  };

  return (
    <div className="mt-[128px] mb-[250px]">
      <div className="container">
        <div className="grid grid-cols-2 gap-16">
          <div className="aspect-[16/10] overflow-hidden border border-gray-300">
            <Swiper
              pagination={{
                type: "progressbar",
              }}
              navigation={true}
              modules={[Pagination, Navigation, Autoplay]}
              className="w-full h-full flex"
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
              {product?.name} -{" "}
              <button
                className="inline-block bg-blue-500/30 text-blue-500 rounded px-3 py-4 text-sm font-bold"
                onClick={handleFavoriteClick}
              >
                {isInFavorites ? "Remove From Favorite" : "Add to favorite"}
              </button>
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

            <div className="mt-10 flex flex-col gap-2">
              <p className="text-black font-medium">
                Amount: <span className="text-gray-dark">{product?.count}</span>
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

        <div className="pt-20">
          <CommentShow></CommentShow>
          <Comment />
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductDetail);
