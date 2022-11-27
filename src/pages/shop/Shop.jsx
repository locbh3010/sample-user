import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { ProductItem } from "../../components/ui/product/Product";
import { db } from "../../configs/firebase-configs";

const removeToneVietnamese = (str) => {
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, "");
  str = str.replace(/\u02C6|\u0306|\u031B/g, "");
  return str;
};

const Shop = () => {
  const [products, setProducts] = useState([]);
  const filterRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const searchRef = useRef(null);
  const [filter, setFilter] = useState({
    sortByPrice: 0,
    shopByCategory: 0,
    text: null,
  });
  const handleGetData = (res) => {
    let temp = [];
    res.docs.length > 0 &&
      res.docs.map((doc) => {
        if (filter.text) {
          const searchName = removeToneVietnamese(
            doc.data().name.toLowerCase()
          );
          searchName.includes(filter.text) &&
            temp.push({ id: doc.id, price: +doc.data().price, ...doc.data() });
        } else {
          temp.push({ id: doc.id, price: +doc.data().price, ...doc.data() });
        }
      });
    setProducts(temp);
  };

  useEffect(() => {
    const cateRef = collection(db, "categories");
    const handleStickyFilter = () => {
      const scrollY = window.scrollY;
      scrollY > 150
        ? filterRef.current.classList.add("translate-y-24")
        : filterRef.current.classList.remove("translate-y-24");
    };

    onSnapshot(cateRef, (res) => {
      let temp = [];
      res.docs.length > 0 &&
        res.docs.map((doc) => temp.push({ id: doc.id, ...doc.data() }));

      setCategories(temp);
    });

    window.addEventListener("scroll", handleStickyFilter);
    return () => {
      window.removeEventListener("scroll", handleStickyFilter);
    };
  }, []);
  useEffect(() => {
    const colRef = collection(db, "products");
    const orderByPrice = orderBy("price", filter.sortByPrice ? "desc" : "asc");
    const shopByCateWhere = where("cateId", "==", filter.shopByCategory);
    let querySnapshot;

    if (filter.shopByCategory) {
      querySnapshot = query(colRef, shopByCateWhere, orderByPrice);
    } else {
      querySnapshot = query(colRef, orderByPrice);
    }

    onSnapshot(querySnapshot, handleGetData);
  }, [filter]);

  const handleSelectChange = (e) => {
    const type = e.target.dataset.type;
    if (type === "sortByPrice")
      setFilter({
        ...filter,
        [type]: +e.target.value,
      });
    else if (type === "shopByCategory") {
      if (e.target.value === "0") {
        setFilter({ ...filter, [type]: +e.target.value });
      } else {
        setFilter({ ...filter, [type]: e.target.value });
      }
    }
  };
  const handleSearch = (e) => {
    e.preventDefault();
    const value = removeToneVietnamese(searchRef.current.value.toLowerCase());
    window.scrollTo(0, 0);
    setFilter({
      ...filter,
      text: value,
    });
  };

  return (
    <div className="pt-24 pb-[250px]">
      <div className="container">
        <h1 className="text-3xl font-medium mb-10">Shop The Latest</h1>
        <div className="flex items-start gap-9 relative">
          <div
            className="basis-[20%] flex-shrink-0 sticky top-0 left-0 duration-300"
            ref={filterRef}
          >
            <div className="flex flex-col gap-4 mb-12">
              <form onSubmit={handleSearch}>
                <div className="flex items-center gap-5 w-[300px] border border-gray-300 rounded py-3 px-5">
                  <button type="submit" className="flex-shrink-0 text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 pointer-events-none"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>
                  <input
                    type="text"
                    className="w-full outline-none bg-transparent"
                    placeholder="Enter your content..."
                    ref={searchRef}
                  />
                </div>
              </form>

              <select
                name="sort"
                id="sort"
                data-type="sortByPrice"
                defaultValue={0}
                onChange={handleSelectChange}
              >
                <option value={0}>Giá tăng dần</option>
                <option value={1}>Giá giảm dần</option>
              </select>
              <select
                name="sort"
                id="sort"
                data-type="shopByCategory"
                onChange={handleSelectChange}
              >
                <option value={0}>Tất cả danh mục</option>
                {categories?.length > 0 &&
                  categories.map((category) => (
                    <option value={category.id} key={category.id}>
                      {category.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="flex-1">
            <div className="grid grid-cols-3 grid-flow-row auto-rows-fr gap-10">
              {products?.length > 0 &&
                products.map((data) => (
                  <ProductItem key={data.id} data={data} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
