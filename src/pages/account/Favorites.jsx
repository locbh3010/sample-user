import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../configs/firebase-configs";
import { userStore } from "../../store/user-store";

const Item = ({ data }) => {
  const [favorite, setFavorite] = useState({});
  const user = userStore((state) => state.user);
  const { id } = data;
  const navigate = useNavigate();

  useEffect(() => {
    onSnapshot(data, (res) => {
      setFavorite({ ...res.data() });
    });
  }, []);
  const handleNavigate = () => {
    navigate(`/product/${id}`);
  };
  const handleRemove = () => {
    const favoriteRef = doc(collection(db, "favorites"), user.id);

    getDoc(favoriteRef).then((res) => {
      const { items } = res.data();

      const index = items.findIndex((obj) => {
        return obj.id === id;
      });

      if (index !== -1) {
        items.splice(index, 1);
        setDoc(favoriteRef, { items });
        return;
      } else {
        toast.error("Remove favorite item error");
      }
    });
  };

  return (
    <div className="rounded-lg bg-white shadow-md p-2 flex flex-col group card card-compact md:card-normal">
      <figure
        className="rounded-lg bg-gray-300 aspect-video flex-shrink-0 mb-4 overflow-hidden cursor-pointer"
        onClick={handleNavigate}
      >
        {favorite?.images && (
          <img
            src={favorite.images[0]}
            alt=""
            className="w-full h-full object-cover duration-300 group-hover:scale-125"
          />
        )}
      </figure>
      <div className="flex-1 flex flex-col gap-6 card-body -mx-6 -my-7">
        <div>
          <p
            className="font-semibold mb-2 line-clamp-1 text-slate-900 card-title"
            onClick={handleNavigate}
          >
            {favorite?.name}
          </p>
          <p className="font-semibold mb-4 text-accent">${favorite?.price}</p>
        </div>

        <div className="mt-auto flex gap-2 card-actions">
          <button
            className="btn btn-square text-white rounded-md btn-error"
            onClick={handleRemove}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
          <button
            className="btn btn-primary rounded-md flex-1"
            onClick={handleNavigate}
          >
            View detail
          </button>
        </div>
      </div>
    </div>
  );
};
const Skeleton = () => {
  return (
    <div className="rounded-lg bg-white shadow-md p-2 flex flex-col group card card-compact md:card-normal">
      <figure className="rounded-lg bg-gray-300 aspect-video flex-shrink-0 mb-4 overflow-hidden cursor-pointer animate-pulse"></figure>
      <div className="flex-1 flex flex-col gap-6 card-body -mx-6 -my-7">
        <div>
          <div className="w-full bg-gray-300 h-6 animate-pulse rounded-md mb-3 animation-delay-200"></div>
          <div className="w-14 bg-gray-300 h-5 animate-pulse rounded-md animation-delay-100"></div>
        </div>

        <div className="mt-auto flex gap-2 card-actions">
          <button className="btn btn-square rounded-md btn-error animate-pulse animation-delay-1000"></button>
          <button className="btn btn-primary rounded-md flex-1 animate-pulse animation-delay-300"></button>
        </div>
      </div>
    </div>
  );
};

const Favorites = () => {
  const user = userStore((state) => state.user);
  const favoriteCol = collection(db, "favorites");
  const [loading, setLoading] = useState(true);

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favoriteRef = doc(favoriteCol, user.id);

    onSnapshot(favoriteRef, (res) => {
      setLoading(true);
      const data = res.data();

      if (data?.items?.length > 0) {
        setFavorites(data.items);
        setLoading(false);
      } else if (!data.items || data.items.length === 0) {
        setFavorites([]);
        setLoading(false);
      }
    });
  }, [user.id]);

  return (
    <div className="py-8">
      <div className="container">
        <div className="grid grid-cols-1 gap-6 grid-flow-row auto-rows-fr sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {!loading &&
            favorites.length > 0 &&
            favorites.map((favorite) => (
              <Item key={favorite.id} data={favorite} />
            ))}
          {loading && (
            <>
              <Skeleton></Skeleton>
              <Skeleton></Skeleton>
              <Skeleton></Skeleton>
              <Skeleton></Skeleton>
            </>
          )}
        </div>

        {!loading && favorites?.length === 0 && (
          <span>You have not item in your favorites</span>
        )}
      </div>
    </div>
  );
};

export default Favorites;
