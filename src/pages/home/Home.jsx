import { limit, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../configs/firebase-configs";
import { collection } from "firebase/firestore";
import { Link } from "react-router-dom";
import { ProductItem, ProductList } from "../../components/ui/product/Product";

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
        <div className="rounded-2xl overflow-hidden relative">
          {products?.length > 0 && (
            <img
              src={products[0].images[0]}
              alt=""
              className="w-full h-[70vh] object-cover rounded-2xl"
            />
          )}

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
