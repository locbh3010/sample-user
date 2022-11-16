import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ProductItem, ProductList } from "../../components/ui/product/Product";
import { db } from "../../configs/firebase-configs";

const Shop = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const colRef = collection(db, "products");

    onSnapshot(colRef, (res) => {
      const docs = res.docs;
      let temp = [];

      docs?.length > 0 &&
        docs.map((doc) => temp.push({ id: doc.id, ...doc.data() }));

      setProducts(temp);
    });
  }, []);

  return (
    <div className="pt-24 pb-[250px]">
      <div className="container">
        <h1 className="text-3xl font-medium mb-10">Shop The Latest</h1>
        <div className="flex items-start gap-9">
          <div className="basis-[20%] flex-shrink-0">
            <div className="flex flex-col gap-4 mb-12">
              <select name="sort" id="sort">
                <option selected>Sort by</option>
                <option value="1">acs</option>
                <option value="2">desc</option>
              </select>
              <select name="sort" id="sort">
                <option selected>Shop by</option>
                <option value="1">acs</option>
                <option value="2">desc</option>
              </select>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="sale"
                  id="sale"
                  className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="sale" className="font-medium">
                  On Sale
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="stock"
                  id="stock"
                  className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="stock" className="font-medium">
                  In stock
                </label>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <ProductList>
              {products?.length > 0 &&
                products.map((data) => (
                  <ProductItem key={data.id} data={data} />
                ))}
            </ProductList>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
